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

  // Bus widget — slides in from the left edge ~20s after landing, once per
  // browser session. A literal bus graphic with the slogan on its side,
  // linking to the site's own homepage. Purely JS-driven so it works on
  // every page (index, byer/*, blog/*) without touching the generated
  // HTML templates.
  var BUS_WIDGET_STORAGE_KEY = "gb-bus-widget-shown";
  var BUS_WIDGET_DELAY_MS = 20000;
  var BUS_WIDGET_URL = "https://www.bookgardinbussen.online/";

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
      '<svg viewBox="0 0 220 110" aria-hidden="true">' +
      '<ellipse cx="110" cy="101" rx="92" ry="6" fill="rgba(31,61,52,0.15)"/>' +
      '<rect x="8" y="22" width="204" height="58" rx="18" fill="#2f5d50"/>' +
      '<rect x="168" y="30" width="34" height="30" rx="8" fill="#faf7f2"/>' +
      '<rect x="24" y="30" width="34" height="22" rx="6" fill="#faf7f2" opacity="0.92"/>' +
      '<rect x="66" y="30" width="34" height="22" rx="6" fill="#faf7f2" opacity="0.92"/>' +
      '<rect x="8" y="55" width="204" height="21" fill="#d98a3d"/>' +
      '<text x="110" y="69.5" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-weight="700" font-size="11" letter-spacing="0.5" fill="#241505">GRATIS HJEMMEBESØG</text>' +
      '<circle cx="46" cy="88" r="13" fill="#1f3d34"/>' +
      '<circle cx="46" cy="88" r="5" fill="#faf7f2"/>' +
      '<circle cx="174" cy="88" r="13" fill="#1f3d34"/>' +
      '<circle cx="174" cy="88" r="5" fill="#faf7f2"/>' +
      "</svg>" +
      '<span class="bus-widget-caption">bookgardinbussen.online →</span>' +
      "</a>";

    document.body.appendChild(widget);

    function close() {
      widget.classList.remove("is-visible");
      window.setTimeout(function () {
        if (widget.parentNode) widget.parentNode.removeChild(widget);
      }, 600);
    }

    widget.querySelector(".bus-widget-close").addEventListener("click", close);

    // Force layout so the slide-in transition actually runs.
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
