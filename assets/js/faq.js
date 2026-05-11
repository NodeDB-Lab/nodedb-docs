// Landing-page FAQ — a custom accordion instead of oxidoc's <Accordion>
// (whose <details> + grid-row animation is hard to retheme cleanly on the
// dark page). Content lives here, pre-written, since custom components can't
// carry RDX children. Rendered by <Faq />. RDX emits a bare lowercased
// <faq>, so we upgrade by query selector.

(function () {
  var ITEMS = [
    {
      q: "Isn't one binary with 8 engines just a monolith?",
      a: "Yes — deliberately. Sharing one process means cross-engine queries run in the same address space with zero network hops. The alternative (5 services) is a distributed monolith pretending not to be one, with worse latency and worse consistency. We scale horizontally with auto-rebalancing vShards, not by splitting engines.",
    },
    {
      q: "Why not just Postgres + pgvector + extensions?",
      a: "Postgres is our wire protocol — that's why your existing client works unchanged. But pgvector bolts a vector index onto a row-store planner that doesn't understand hybrid ranking. We built the planner from scratch to route each sub-query to the engine that fits: graph traversals use CSR, vector search uses HNSW, analytics use columnar.",
    },
    {
      q: "What about multi-tenancy, RLS, and audit logs?",
      a: "All first-class. Row-Level Security via <code>CREATE RLS POLICY</code> with <code>$auth.id</code> / <code>$auth.role</code> context — applied transparently to every engine, no app changes. Audit logging captures who did what and when, tamper-evident. Tenant isolation, RBAC, and RLS compose so you can run real multi-tenant SaaS on one cluster without writing your own row filters.",
    },
    {
      q: "Can I query the database as of a past point in time?",
      a: "Yes — for the engines where it matters. Bitemporal covers graph, strict documents, columnar (plain + timeseries), arrays, and CRDT sync. Every write there records both <em>valid time</em> (when the fact was true in the real world) and <em>system time</em> (when the database learned it). Run any query <code>AS OF</code> a past moment, audit a row's full history, or do GDPR-compliant erasure that preserves the audit trail. Vector, FTS, KV, and spatial indexes stay current-state-only by design — that's where you want speed, not history.",
    },
    {
      q: "Do you actually handle scientific array data, or is that marketing?",
      a: "Real engine. ND coordinate-indexed sparse arrays with Hilbert/Z-order locality, per-tile MBR pruning, compression via our codec stack, WAL-durable, Raft-replicated. Built to replace TileDB / SciDB / Zarr for genomics (variant × sample × position), earth observation (lat × lon × band × time), and climate cubes. And yes — you can join an array slice against a vector ANN search in one SQL query.",
    },
    {
      q: "Does it run on mobile / offline / in the browser?",
      a: "Yes. NodeDB-Lite is a 4.5MB WASM + iOS/Android FFI build — the same 8 engines, embedded. Edge-to-cloud sync is CRDT-native via Loro, so offline writes merge deterministically when the device reconnects.",
    },
  ];

  function build(host) {
    var openFirst = host.getAttribute("open-first") !== "false";
    var html = '<div class="ndb-faq-list">';
    ITEMS.forEach(function (it, i) {
      var open = i === 0 && openFirst;
      html +=
        '<div class="ndb-faq-item' + (open ? " is-open" : "") + '">' +
          '<button class="ndb-faq-q" type="button" aria-expanded="' + (open ? "true" : "false") + '">' +
            "<span>" + it.q + "</span>" +
            '<span class="ndb-faq-icon" aria-hidden="true">+</span>' +
          "</button>" +
          '<div class="ndb-faq-panel"><div class="ndb-faq-a">' + it.a + "</div></div>" +
        "</div>";
    });
    html += "</div>";
    host.innerHTML = html;

    host.querySelectorAll(".ndb-faq-q").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.parentElement;
        var nowOpen = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", nowOpen ? "true" : "false");
      });
    });
  }

  function init() {
    document.querySelectorAll("faq, Faq").forEach(build);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
