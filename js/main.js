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

  // Booking form (no backend yet — validate and give feedback)
  var form = document.getElementById("booking-form");
  var note = document.getElementById("form-note");
  if (form && note) {
    form.addEventListener("submit", function (e) {
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

      var name = (form.elements.name.value || "").trim().split(" ")[0];
      note.classList.add("ok");
      note.textContent = name
        ? "Tak, " + name + "! Vi ringer til dig inden for 1 hverdag."
        : "Tak! Vi ringer til dig inden for 1 hverdag.";
      form.reset();
    });
  }
})();
