/* WealthVision — web teaser behaviour.
 * ─────────────────────────────────────────────────────────────────────────
 *  EDIT EVERYTHING HERE.  This CONFIG block is the only thing you normally
 *  need to touch. See README.md for details.
 * ───────────────────────────────────────────────────────────────────────── */
var CONFIG = {
  // Where the real app screens live, relative to this teaser folder.
  // Deploy the whole "Prototype-Prod-Ready" folder and leave this as "..".
  APP_BASE: "..",

  // "prelaunch"  -> shows the founding-price waitlist form.
  // "live"       -> shows the App Store / Google Play download buttons.
  LAUNCH_STATE: "prelaunch",

  // Pricing (one-time "lifetime" unlock — no subscription).
  PRICE_FOUNDING: "$9.99",
  PRICE_REG: "$19.99",

  // Store + beta links (fill when live).
  APP_STORE_URL: "#",
  PLAY_URL: "#",
  TESTFLIGHT_URL: "", // e.g. "https://testflight.apple.com/join/XXXX" — shows a beta button when set

  // Waitlist email endpoint. Leave "" for demo mode (no real submit).
  // Paste your form POST URL here, e.g.:
  //   Formspree  -> "https://formspree.io/f/abcdwxyz"
  //   Formspark  -> "https://submit-form.com/XXXXXXXXX"
  // The form posts an "email" field (plus a honeypot + source), which both providers accept.
  WAITLIST_ENDPOINT: "https://formspree.io/f/mgogvond",

  // Primary button label.
  CTA_TEXT: "Get the app"
};

/* ───────────────────────── Tool tabs (the real app, embedded) ───────────────────────── */
var TOOLS = {
  sim: {
    file: "screen5.html",
    title: "See what steady investing becomes",
    body:
      'At a 7% historical average, $200/month for 30 years grows to about <b>$244,000</b> — ' +
      'roughly <b>$72,000</b> of that is what you put in, the rest is compounding. Move the sliders ' +
      'to make it yours.<span class="fineprint">Illustrative only. Past performance doesn\'t guarantee future results.</span>'
  },
  path: {
    file: "accelerate.html",
    title: 'Turn "25 years" into a plan you control',
    body:
      "A scary timeline isn't a verdict. Pull the levers — save a little more, start now, adjust the " +
      "growth assumption — and watch the years drop in real time."
  },
  buy: {
    file: "screen10a.html",
    title: 'A judgment-free "Can I Buy It?" check',
    body:
      "Enter a purchase and get an honest read using the 50/30/20 rule and debt-to-income — framed as " +
      "simple math, never morality."
  },
  kid: {
    file: "kidmode.html",
    title: "Teach your kid to save — offline",
    body:
      "An allowance piggy-bank for ages 5–12: save or spend each week, watch the jar fill toward a goal. " +
      "No ads, no links, and nothing about your kid leaves the phone."
  }
};

(function () {
  "use strict";

  function base(file) {
    return String(CONFIG.APP_BASE || "..").replace(/\/+$/, "") + "/" + file;
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function setText(sel, txt) { $all(sel).forEach(function (el) { el.textContent = txt; }); }
  function setHref(sel, href) { $all(sel).forEach(function (el) { if (href) el.setAttribute("href", href); }); }

  /* ── Fill config-driven content ── */
  function applyConfig() {
    setText("[data-price-founding]", CONFIG.PRICE_FOUNDING);
    setText("[data-price-reg]", CONFIG.PRICE_REG);

    // Launch-state variant (waitlist vs store buttons)
    $all("[data-when]").forEach(function (el) {
      el.hidden = el.getAttribute("data-when") !== CONFIG.LAUNCH_STATE;
    });

    // Store links
    setHref('[data-store="ios"]', CONFIG.APP_STORE_URL);
    setHref('[data-store="android"]', CONFIG.PLAY_URL);
    setHref('[data-store="testflight"]', CONFIG.TESTFLIGHT_URL);

    // TestFlight button (pre-launch only, when a link is provided)
    if (CONFIG.LAUNCH_STATE === "prelaunch" && CONFIG.TESTFLIGHT_URL) {
      var tf = $("[data-testflight]");
      if (tf) tf.hidden = false;
    }

    // Primary CTA label
    setText(".nav-cta", CONFIG.CTA_TEXT);
    var heroCta = $(".hero-actions .btn-primary");
    if (heroCta) heroCta.textContent = CONFIG.CTA_TEXT;

    // Year
    var y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ── Lazy-load iframes when they approach the viewport ── */
  function lazyFrames() {
    var frames = $all("iframe[data-src]");
    function load(f) {
      if (f.dataset.src) { f.src = base(f.dataset.src.replace(/^\.\.\//, "")); f.removeAttribute("data-src"); }
    }
    if (!("IntersectionObserver" in window)) { frames.forEach(load); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { load(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "300px" });
    frames.forEach(function (f) { io.observe(f); });
  }

  /* ── Playground tabs swap the embedded tool ── */
  function initTabs() {
    var frame = $("#playFrame");
    var capTitle = $("[data-cap-title]");
    var capBody = $("[data-cap-body]");
    if (frame) frame.src = base(TOOLS.sim.file); // normalise via APP_BASE

    $all(".tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        var key = tab.getAttribute("data-tab");
        var tool = TOOLS[key];
        if (!tool) return;

        $all(".tab").forEach(function (t) {
          var on = t === tab;
          t.classList.toggle("is-active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
        });

        if (frame) frame.src = base(tool.file);
        if (capTitle) capTitle.textContent = tool.title;
        if (capBody) capBody.innerHTML = tool.body;
        requestAnimationFrame(fitPhones);
      });
    });
  }

  /* ── Scale the 393px phone frames to fit narrow columns ── */
  function fitPhones() {
    $all("[data-stage]").forEach(function (ph) {
      var wrap = ph.parentNode && ph.parentNode.classList && ph.parentNode.classList.contains("phone-fit")
        ? ph.parentNode
        : wrapPhone(ph);
      var avail = wrap.parentNode.clientWidth;
      var scale = Math.min(1, avail / 393);
      var h = ph.offsetHeight || 760;
      ph.style.transformOrigin = "top left";
      ph.style.transform = "scale(" + scale + ")";
      wrap.style.width = 393 * scale + "px";
      wrap.style.height = h * scale + "px";
    });
  }
  function wrapPhone(ph) {
    var wrap = document.createElement("div");
    wrap.className = "phone-fit";
    wrap.style.margin = "0 auto";
    ph.parentNode.insertBefore(wrap, ph);
    wrap.appendChild(ph);
    return wrap;
  }

  /* ── Waitlist form ── */
  function initForm() {
    var form = $("#waitlistForm");
    if (!form) return;
    var input = $("#email", form);
    var note = $("#formNote");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (input.value || "").trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        if (note) note.textContent = "Please enter a valid email address.";
        input.focus();
        return;
      }
      var done = function () {
        form.classList.add("sent");
        input.value = "";
        input.disabled = true;
        var btn = $("button", form);
        if (btn) { btn.disabled = true; btn.textContent = "You're on the list ✓"; }
        if (note) note.textContent = "Founding price is yours at launch — see you soon. 🎉";
      };
      if (CONFIG.WAITLIST_ENDPOINT) {
        var data = new FormData(form);
        fetch(CONFIG.WAITLIST_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: data })
          .then(function (r) { if (!r.ok) throw new Error("bad status"); done(); })
          .catch(function () { if (note) note.textContent = "Hmm, that didn't go through — please try again in a moment."; });
      } else {
        // Demo mode: no endpoint configured yet.
        done();
        if (note) note.textContent = "Demo mode — set CONFIG.WAITLIST_ENDPOINT to collect emails for real.";
      }
    });
  }

  /* ── Boot ── */
  document.addEventListener("DOMContentLoaded", function () {
    applyConfig();
    lazyFrames();
    initTabs();
    initForm();
    fitPhones();
    window.addEventListener("load", fitPhones);
  });

  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(fitPhones, 120);
  });
})();
