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
  // browser session, with the same offer as the hero. Purely JS-driven so
  // it works on every page (index, byer/*, blog/*) without touching the
  // generated HTML templates.
  var BUS_WIDGET_STORAGE_KEY = "gb-bus-widget-shown";
  var BUS_WIDGET_DELAY_MS = 20000;
  var BUS_WIDGET_AFFILIATE_URL =
    "https://www.partner-ads.com/dk/klikbanner.php?partnerid=52168&bannerid=113375&htmlurl=https://gardinbus.nu/book-gardinbus/";

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
    widget.setAttribute("role", "dialog");
    widget.setAttribute("aria-label", "Tilbud fra bookgardinbussen.online");
    widget.innerHTML =
      '<button type="button" class="bus-widget-close" aria-label="Luk">&times;</button>' +
      '<span class="bus-widget-icon" aria-hidden="true">' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
      '<rect width="32" height="32" rx="7" fill="#2f5d50"/>' +
      '<rect x="4" y="11" width="18" height="10" rx="2" fill="#faf7f2"/>' +
      '<rect x="6.5" y="13.5" width="4.5" height="4" rx="1" fill="#3a6f60"/>' +
      '<rect x="12.5" y="13.5" width="4.5" height="4" rx="1" fill="#3a6f60"/>' +
      '<rect x="22" y="12.5" width="6" height="6.5" rx="1.5" fill="#faf7f2"/>' +
      '<circle cx="10" cy="23" r="2.4" fill="#23291f"/>' +
      '<circle cx="21" cy="23" r="2.4" fill="#23291f"/>' +
      "</svg>" +
      "</span>" +
      '<p class="eyebrow">Mobil gardinservice i hele Danmark</p>' +
      "<h3>Vi kører hele gardinbutikken hjem til dig</h3>" +
      "<p>Slip for at slæbe prøver frem og tilbage. Vi kommer hjem til dig med et bredt udvalg af stoffer og løsninger. Vi måler op, rådgiver og monterer — alt sammen på ét besøg.</p>" +
      '<div class="bus-widget-actions">' +
      '<a class="btn btn-primary" href="' + BUS_WIDGET_AFFILIATE_URL + '" target="_blank" rel="noopener sponsored">Book gratis hjemmebesøg</a>' +
      '<a class="btn btn-ghost" href="/index.html#produkter">Se produkter</a>' +
      "</div>" +
      '<ul class="bus-widget-badges">' +
      "<li>Gratis opmåling</li>" +
      "<li>Ingen købepligt</li>" +
      "<li>Montering inkluderet</li>" +
      "</ul>";

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
