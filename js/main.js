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

  // Strøm-widget — slides in from the side after 15s, once per session.
  if (!sessionStorage.getItem("stroemWidgetDismissed")) {
    window.setTimeout(function () {
      if (sessionStorage.getItem("stroemWidgetDismissed")) return;

      var widget = document.createElement("aside");
      widget.className = "stroem-widget";
      widget.setAttribute("role", "complementary");
      widget.setAttribute("aria-label", "Strøm-tilbud");
      widget.innerHTML =
        '<button type="button" class="stroem-widget-close" aria-label="Luk">&times;</button>' +
        '<div class="stroem-widget-head">' +
          '<span class="stroem-widget-icon" aria-hidden="true">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 11-14h-7l1-6Z"/></svg>' +
          '</span>' +
          '<p class="stroem-widget-tag">Strøm-tip</p>' +
        '</div>' +
        '<p class="stroem-widget-lead">Vidste du, at du muligvis kan spare penge på din strøm? Se om du kan finde et billigere elselskab.</p>' +
        '<a class="btn btn-primary" href="https://bedst-stroem-tilbud.vercel.app/" target="_blank" rel="noopener">Tjek din elpris</a>';

      document.body.appendChild(widget);

      function dismiss() {
        widget.classList.remove("is-visible");
        sessionStorage.setItem("stroemWidgetDismissed", "1");
        window.setTimeout(function () { widget.remove(); }, 500);
      }
      widget.querySelector(".stroem-widget-close").addEventListener("click", dismiss);

      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          widget.classList.add("is-visible");
        });
      });
    }, 15000);
  }
})();
