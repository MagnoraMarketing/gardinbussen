/* Gardinbussen · client-side behaviour */
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var navList = document.getElementById("nav-list");
  if (toggle && navList) {
    toggle.addEventListener("click", function () {
      var open = navList.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close menu when a link is clicked
    navList.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && navList.classList.contains("open")) {
        navList.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Mobil bundmenu — to punkter på hver side af en fremhævet "Book nu"-knap
  // i midten. Indsættes med JS, så den kommer på alle sider uden at røre de
  // genererede skabeloner. Book-linket hentes fra menuens "Book
  // hjemmebesøg"-knap, så det altid er det samme affiliate-link.
  function initBottomNav() {
    var cta = document.querySelector(".nav-cta");
    var bookUrl = cta ? cta.getAttribute("href") : "/#booking";
    var path = location.pathname;
    var icon = function (d) {
      return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" ' +
        'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + "</svg>";
    };
    var items = [
      { href: "/", label: "Forside", active: path === "/" || path === "/index.html",
        icon: icon('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>') },
      { href: "/#produkter", label: "Produkter", active: false,
        icon: icon('<rect x="4" y="3" width="16" height="4" rx="1"/><path d="M6 7v11M10 7v11M14 7v11M18 7v11"/><path d="M4 21h16"/>') },
      null,
      { href: "/#omraade", label: "Byer", active: path.indexOf("/byer/") === 0,
        icon: icon('<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>') },
      { href: "/blog/index.html", label: "Guides", active: path.indexOf("/blog/") === 0,
        icon: icon('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/><path d="M8 7h7M8 11h7"/>') },
    ];
    var html = items.map(function (it) {
      if (!it) {
        return '<a class="bottom-nav-book" href="' + bookUrl + '" target="_blank" rel="noopener sponsored">' +
          '<span class="bottom-nav-book-btn" aria-hidden="true">' +
          '<svg viewBox="0 0 32 32" width="30" height="30" fill="none">' +
          '<rect x="2" y="10" width="24" height="12" rx="2.5" fill="currentColor"/>' +
          '<rect x="5" y="13" width="6" height="5" rx="1" fill="#d98a3d"/>' +
          '<rect x="13" y="13" width="6" height="5" rx="1" fill="#d98a3d"/>' +
          '<rect x="21" y="12" width="7" height="7" rx="1.5" fill="currentColor"/>' +
          '<circle cx="9" cy="24" r="3" fill="#1f3d34"/><circle cx="22" cy="24" r="3" fill="#1f3d34"/>' +
          "</svg></span>" +
          '<span class="bottom-nav-label">Book nu</span></a>';
      }
      return '<a href="' + it.href + '"' + (it.active ? ' aria-current="page"' : "") + ">" +
        it.icon + '<span class="bottom-nav-label">' + it.label + "</span></a>";
    }).join("");
    var nav = document.createElement("nav");
    nav.className = "bottom-nav";
    nav.setAttribute("aria-label", "Genveje");
    nav.innerHTML = html;
    document.body.appendChild(nav);
    document.body.classList.add("has-bottom-nav");
  }

  initBottomNav();

  // Bus widget — drives in from fully off-screen, all the way across, ~20s
  // after landing, once per browser session. A literal bus graphic with
  // the slogan on its side, topped with a "Book Gardinbussen" heading,
  // linking to the site's own homepage. Purely JS-driven so it works on
  // every page (index, byer/*, blog/*) without touching the generated
  // HTML templates.
  var BUS_WIDGET_STORAGE_KEY = "gb-bus-widget-shown";
  var BUS_WIDGET_DELAY_MS = 20000;
  var BUS_WIDGET_URL = "https://www.bookgardinbussen.online/";
  var BUS_WIDGET_DRIVE_MS = 1800;

  function initBusWidget() {
    if (sessionStorage.getItem(BUS_WIDGET_STORAGE_KEY)) return;

    window.setTimeout(function () {
      if (sessionStorage.getItem(BUS_WIDGET_STORAGE_KEY)) return;
      sessionStorage.setItem(BUS_WIDGET_STORAGE_KEY, "1");
      showBusWidget();
    }, BUS_WIDGET_DELAY_MS);
  }

  function showBusWidget() {
    var widget = document.createElement("div");
    widget.className = "bus-widget";
    widget.innerHTML =
      '<button type="button" class="bus-widget-close" aria-label="Luk">&times;</button>' +
      '<a class="bus-widget-link" href="' + BUS_WIDGET_URL + '" target="_blank" rel="noopener" ' +
      'aria-label="Book gratis hjemmebesøg hos Gardinbussen – åbner bookgardinbussen.online">' +
      '<span class="bus-widget-text">' +
      '<span class="bus-widget-heading">Book Gardinbussen <span class="bus-widget-heading-arrow" aria-hidden="true">→</span></span>' +
      '<span class="bus-widget-sub">Gratis hjemmebesøg i hele Danmark</span>' +
      '</span>' +
      '<svg class="bus-widget-svg" viewBox="0 0 260 120" aria-hidden="true">' +
      '<defs>' +
      '<linearGradient id="gbBody" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#3a6f60"/><stop offset="1" stop-color="#1f3d34"/>' +
      '</linearGradient>' +
      '<linearGradient id="gbGlass" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#eef6f2"/><stop offset="1" stop-color="#cfe3da"/>' +
      '</linearGradient>' +
      '</defs>' +
      '<g stroke="#3a6f60" stroke-linecap="round">' +
      '<line x1="0" y1="42" x2="20" y2="42" stroke-width="4" opacity="0.5"/>' +
      '<line x1="4" y1="58" x2="24" y2="58" stroke-width="4" opacity="0.35"/>' +
      '<line x1="0" y1="74" x2="18" y2="74" stroke-width="4" opacity="0.2"/>' +
      '</g>' +
      '<ellipse cx="140" cy="111" rx="102" ry="6" fill="rgba(11,37,69,0.15)"/>' +
      '<rect x="28" y="28" width="204" height="58" rx="20" fill="url(#gbBody)"/>' +
      '<rect x="44" y="34" width="100" height="24" rx="9" fill="url(#gbGlass)" opacity="0.96"/>' +
      '<rect x="150" y="34" width="2" height="24" fill="#1f3d34" opacity="0.25"/>' +
      '<rect x="190" y="34" width="36" height="32" rx="11" fill="url(#gbGlass)"/>' +
      '<rect x="32" y="63" width="196" height="18" rx="5" fill="#d98a3d"/>' +
      '<text x="130" y="76" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="10.5" letter-spacing="0.5" fill="#241505">GRATIS HJEMMEBESØG</text>' +
      '<circle cx="236" cy="58" r="4" fill="#ffd77a"/>' +
      '<circle cx="70" cy="98" r="15" fill="#1f3d34"/>' +
      '<circle cx="70" cy="98" r="9" fill="#3a6f60"/>' +
      '<circle cx="70" cy="98" r="3.5" fill="#faf7f2"/>' +
      '<circle cx="198" cy="98" r="15" fill="#1f3d34"/>' +
      '<circle cx="198" cy="98" r="9" fill="#3a6f60"/>' +
      '<circle cx="198" cy="98" r="3.5" fill="#faf7f2"/>' +
      "</svg>" +
      "</a>";

    document.body.appendChild(widget);

    function close() {
      widget.classList.remove("is-visible");
      window.setTimeout(function () {
        if (widget.parentNode) widget.parentNode.removeChild(widget);
      }, BUS_WIDGET_DRIVE_MS);
    }

    widget.querySelector(".bus-widget-close").addEventListener("click", close);

    // Force layout so the drive-in transition actually runs.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        widget.classList.add("is-visible");
      });
    });
  }

  initBusWidget();

  // Booking form — posts to /api/booking, falls back gracefully.
  var form = document.getElementById("booking-form");
  var note = document.getElementById("form-note");
  if (form && note) {
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      note.className = "form-note";
      note.textContent = "";

      if (!form.checkValidity()) {
        note.classList.add("err");
        note.textContent = "Udfyld venligst navn, telefon og et gyldigt postnummer.";
        var firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var payload = {
        name: form.elements.name.value.trim(),
        phone: form.elements.phone.value.trim(),
        zip: form.elements.zip.value.trim(),
        email: form.elements.email.value.trim(),
        message: form.elements.message.value.trim(),
        company: form.elements.company ? form.elements.company.value.trim() : "",
        city: form.elements.city ? form.elements.city.value.trim() : "",
        source: form.elements.source ? form.elements.source.value.trim() : "",
      };
      var firstName = payload.name.split(" ")[0];

      if (submitBtn) { submitBtn.disabled = true; }
      note.textContent = "Sender …";

      try {
        var res = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        var data = await res.json().catch(function () { return {}; });

        if (res.ok && data.ok) {
          note.classList.add("ok");
          note.textContent = firstName
            ? "Tak, " + firstName + "! Vi ringer til dig inden for 1 hverdag."
            : "Tak! Vi ringer til dig inden for 1 hverdag.";
          form.reset();
        } else {
          note.classList.add("err");
          note.textContent = (data && data.error)
            ? data.error
            : "Noget gik galt. Skriv venligst til os på mail@bookgardinbussen.online.";
        }
      } catch (err) {
        note.classList.add("err");
        note.textContent = "Kunne ikke sende lige nu. Skriv venligst til os på mail@bookgardinbussen.online.";
      } finally {
        if (submitBtn) { submitBtn.disabled = false; }
      }
    });
  }
})();
