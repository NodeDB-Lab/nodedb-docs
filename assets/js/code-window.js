// Landing-page code window — a fixed-palette alternative to oxidoc's
// <CodeBlock>. Oxidoc's syntax tokens are theme-aware (their colours come
// from --oxidoc-tok-* vars that flip with the colour scheme); this one uses
// literal hex on .cw-* classes, so the panel looks identical regardless of
// light/dark. It also lets us highlight NodeDB SQL extensions (e.g.
// `GRAPH RAG FUSION`) that a generic tokenizer doesn't know.
//
// Rendered by <CodeWindow snippet="..." title="..." lang="..." />. RDX emits
// a bare lowercased <codewindow>, so we upgrade by query selector. Custom
// components can't carry RDX children, so snippets live here, pre-highlighted.

(function () {
  var SNIPPETS = {
    "graphrag-fusion":
      '<span class="cw-cm">-- Semantic retrieval + graph context for your LLM. One statement.</span>\n' +
      '<span class="cw-kw">GRAPH RAG FUSION ON</span> entities\n' +
      '  <span class="cw-kw">QUERY</span>           <span class="cw-nm">$1</span>\n' +
      '  <span class="cw-kw">VECTOR_TOP_K</span>    <span class="cw-nm">50</span>\n' +
      '  <span class="cw-kw">EXPANSION_DEPTH</span> <span class="cw-nm">2</span>\n' +
      '  <span class="cw-kw">EDGE_LABEL</span>      <span class="cw-st">&#39;related_to&#39;</span>\n' +
      '  <span class="cw-kw">DIRECTION</span>       both\n' +
      '  <span class="cw-kw">FINAL_TOP_K</span>     <span class="cw-nm">10</span>\n' +
      '  <span class="cw-kw">RRF_K</span>           (<span class="cw-nm">60.0</span>, <span class="cw-nm">35.0</span>)\n' +
      '  <span class="cw-kw">MAX_VISITED</span>     <span class="cw-nm">1000</span>;',
  };

  function build(host) {
    var key = host.getAttribute("snippet") || "";
    var title = host.getAttribute("title") || "";
    var lang = host.getAttribute("lang") || "";
    var code = SNIPPETS[key] || "";
    host.innerHTML =
      '<div class="cw">' +
        '<div class="cw-bar">' +
          '<span class="cw-dots"><i></i><i></i><i></i></span>' +
          (title ? '<span class="cw-title">' + title + "</span>" : "") +
          (lang ? '<span class="cw-lang">' + lang + "</span>" : "") +
        "</div>" +
        '<pre class="cw-body"><code>' + code + "</code></pre>" +
      "</div>";
  }

  function init() {
    document.querySelectorAll("codewindow, CodeWindow").forEach(build);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
