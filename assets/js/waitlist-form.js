// Landing-page get-started actions + release-updates form, rendered by
// <WaitlistForm action="…" github="…" quickstart="…" discord="…" producthunt="…" />.
//
// RDX renders the component as a bare lowercased <waitlistform> element (no
// hyphen → not a valid custom-element name), so we upgrade it by query
// selector rather than via customElements.define. The MailerLite JSONP
// endpoint sends no CORS headers, so we POST with mode:"no-cors" and treat a
// resolved fetch as success (the submission still reaches them). Because that
// fetch always resolves, the email is validated before we ever submit —
// otherwise an empty or malformed address would land on the success state.

(function () {
  var GITHUB =
    '<svg viewBox="0 0 496 512" width="17" height="17" fill="currentColor" aria-hidden="true">' +
    '<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>';
  var DISCORD =
    '<svg viewBox="0 0 640 512" width="19" height="19" fill="currentColor" aria-hidden="true">' +
    '<path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.3 337.6 417.9 337.6z"/></svg>';
  var BOOK =
    '<svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor" aria-hidden="true">' +
    '<path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zM64 416c0-17.7 14.3-32 32-32H352v64H96c-17.7 0-32-14.3-32-32zM128 136c0-4.4 3.6-8 8-8H328c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H136c-4.4 0-8-3.6-8-8V136zm8 56H328c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H136c-4.4 0-8-3.6-8-8V200c0-4.4 3.6-8 8-8z"/></svg>';

  // Pragmatic email check: non-empty local part, single @, dotted domain.
  // Stricter than type="email"'s native rule, which accepts things like "a@b".
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var ERR_DEFAULT = "Something went wrong — try again, or ping us on Discord.";

  function attr(host, name, fallback) {
    var v = host.getAttribute(name);
    return v && v.length ? v : fallback;
  }

  function build(host) {
    var action = attr(host, "action", "");
    var github = attr(host, "github", "https://github.com/NodeDB-Lab/nodedb");
    var quickstart = attr(host, "quickstart", "/docs/introduction/quickstart");
    var discord = attr(host, "discord", "https://discord.gg/s54gDMVc7B");
    var ph = attr(host, "producthunt", "https://www.producthunt.com/products/nodedb");

    host.innerHTML =
      '<div class="ndb-wl-actions">' +
        '<a class="ndb-wl-btn ndb-wl-btn-primary" href="' + github + '" target="_blank" rel="noopener">' + GITHUB + "<span>Star on GitHub</span></a>" +
        '<a class="ndb-wl-btn" href="' + quickstart + '">' + BOOK + "<span>Read the Quickstart</span></a>" +
        '<a class="ndb-wl-btn" href="' + discord + '" target="_blank" rel="noopener">' + DISCORD + "<span>Join Discord</span></a>" +
      "</div>" +
      '<div class="ndb-wl-updates">' +
        '<p class="ndb-wl-updates-title">Want release updates?</p>' +
        '<p class="ndb-wl-updates-sub">New engines, benchmarks, and the 1.0 launch — no spam, unsubscribe anytime.</p>' +
        '<form class="ndb-wl-form" action="' + action + '" method="post">' +
          '<input class="ndb-wl-email" type="email" name="fields[email]" required ' +
                 'autocomplete="email" placeholder="you@work.com" aria-label="Work email" />' +
          '<input type="hidden" name="ml-submit" value="1" />' +
          '<input type="hidden" name="anticsrf" value="true" />' +
          '<button class="ndb-wl-submit" type="submit"><span class="ndb-wl-label">Notify me</span></button>' +
        "</form>" +
        '<p class="ndb-wl-msg ndb-wl-error" role="alert" hidden>' + ERR_DEFAULT + "</p>" +
        '<div class="ndb-wl-msg ndb-wl-success" hidden>' +
          "<strong>You're subscribed.</strong> Check your inbox to confirm — we'll email you on new releases and the 1.0 launch." +
        "</div>" +
      "</div>" +
      '<div class="ndb-wl-ph-row">' +
        '<a class="ndb-wl-btn ndb-wl-btn-ph" href="' + ph + '" target="_blank" rel="noopener"><span class="ndb-wl-ph-mark">P</span><span>See us on Product Hunt</span></a>' +
      "</div>";

    var form = host.querySelector("form");
    var email = host.querySelector(".ndb-wl-email");
    var btn = host.querySelector(".ndb-wl-submit");
    var label = host.querySelector(".ndb-wl-label");
    var errEl = host.querySelector(".ndb-wl-error");
    var okEl = host.querySelector(".ndb-wl-success");

    function showError(msg) {
      errEl.textContent = msg || ERR_DEFAULT;
      errEl.hidden = false;
      btn.disabled = false;
      label.textContent = "Notify me";
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      errEl.hidden = true;

      // Validate before submitting. The no-cors fetch below always resolves,
      // so without this guard an empty or malformed email would still show the
      // success state. reportValidity() surfaces the native browser bubble.
      var value = email.value.trim();
      email.value = value;
      if (!EMAIL_RE.test(value) || !form.checkValidity()) {
        form.reportValidity();
        showError("Please enter a valid email address.");
        return;
      }

      btn.disabled = true;
      label.textContent = "Submitting…";

      var body = new URLSearchParams();
      new FormData(form).forEach(function (v, k) { body.append(k, v); });

      fetch(form.action, {
        method: "POST",
        mode: "no-cors",
        body: body,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then(function () {
          form.hidden = true;
          okEl.hidden = false;
        })
        .catch(function () {
          showError();
        });
    });
  }

  function init() {
    document.querySelectorAll("waitlistform, WaitlistForm").forEach(build);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
