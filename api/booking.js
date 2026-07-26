// Vercel serverless function: POST /api/booking
// Modtager bookinghenvendelser fra hjemmesiden.
//
// Sender en e-mail via Resend hvis miljøvariablerne RESEND_API_KEY og
// BOOKING_TO er sat. Er de ikke sat, valideres og kvitteres henvendelsen
// stadig (og logges), så formularen virker fra dag ét og kan kobles til
// e-mail senere uden kodeændringer.

const ZIP_RE = /^\d{4}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, max) {
  return String(value == null ? "" : value).trim().slice(0, max);
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string" && req.body) {
    try { return JSON.parse(req.body); } catch (e) { return {}; }
  }
  return await new Promise(function (resolve) {
    let data = "";
    req.on("data", function (chunk) { data += chunk; });
    req.on("end", function () {
      try { resolve(data ? JSON.parse(data) : {}); } catch (e) { resolve({}); }
    });
    req.on("error", function () { resolve({}); });
  });
}

async function sendEmail(booking) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO;
  const from = process.env.BOOKING_FROM || "Gardinbussen <onboarding@resend.dev>";
  if (!key || !to) return { sent: false, reason: "not_configured" };

  const rows = [
    ["Navn", booking.name],
    ["Telefon", booking.phone],
    ["Postnr.", booking.zip],
    ["E-mail", booking.email || "—"],
    ["Besked", booking.message || "—"],
  ]
    .map(function (r) {
      return "<tr><td style=\"padding:4px 12px 4px 0;font-weight:700\">" +
        escapeHtml(r[0]) + "</td><td>" + escapeHtml(r[1]) + "</td></tr>";
    })
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + key,
    },
    body: JSON.stringify({
      from: from,
      to: [to],
      reply_to: booking.email || undefined,
      subject: "Ny booking fra " + booking.name + " (" + booking.zip + ")",
      html: "<h2>Ny henvendelse via bookgardinbussen.online</h2><table>" + rows + "</table>",
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(function () { return ""; });
    return { sent: false, reason: "provider_error", status: res.status, detail: text };
  }
  return { sent: true };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = await readJsonBody(req);
  const booking = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 40),
    zip: clean(body.zip, 4),
    email: clean(body.email, 160),
    message: clean(body.message, 2000),
  };

  const errors = [];
  if (!booking.name) errors.push("navn");
  if (!booking.phone) errors.push("telefon");
  if (!ZIP_RE.test(booking.zip)) errors.push("postnummer");
  if (booking.email && !EMAIL_RE.test(booking.email)) errors.push("e-mail");
  // Honeypot: skjult felt der kun udfyldes af bots
  if (clean(body.company, 100)) {
    return res.status(200).json({ ok: true });
  }

  if (errors.length) {
    return res.status(400).json({ ok: false, error: "Ugyldige felter: " + errors.join(", ") });
  }

  try {
    const result = await sendEmail(booking);
    if (!result.sent && result.reason === "provider_error") {
      console.error("Booking email provider error:", result.status, result.detail);
      return res.status(502).json({ ok: false, error: "Kunne ikke sende lige nu. Skriv venligst til os på mail@bookgardinbussen.online." });
    }
    if (!result.sent) {
      // Ikke konfigureret endnu — log så henvendelsen ikke går tabt.
      console.log("Booking (email ikke konfigureret):", JSON.stringify(booking));
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Booking handler error:", err);
    return res.status(500).json({ ok: false, error: "Der opstod en fejl. Prøv igen." });
  }
};
