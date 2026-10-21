const express = require("express");
const nodemailer = require("nodemailer");
const pool = require("../db");

const router = express.Router();
const trainingOptions = new Set(["Strength", "Conditioning", "Mobility", "Not sure yet"]);
const experienceOptions = new Set(["new", "beginner", "intermediate", "experienced", "returning"]);
const recipient = process.env.TRIAL_TO_EMAIL || "slowmoe.7860@gmail.com";
const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpSecure = process.env.SMTP_SECURE
  ? process.env.SMTP_SECURE === "true"
  : smtpPort === 465;

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

async function sendNotification(request) {
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASS?.replace(/\s/g, "");
  if (!user || !password) {
    console.error("Trial request saved, but Gmail SMTP is not configured. Set SMTP_USER and SMTP_PASS.");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user, pass: password },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  try {
    const result = await transporter.sendMail({
      from: { name: "Ironhouse Fitness", address: user },
      to: recipient,
      replyTo: request.email,
      subject: "New Ironhouse free-trial request",
      text: [
        "A new free-trial request was submitted.",
        "",
        `Name: ${request.name}`,
        `Email: ${request.email}`,
        `Phone: ${request.phone || "Not provided"}`,
        `Training interest: ${request.preferredSession}`,
        `Experience: ${request.experienceLevel}`,
        "",
        "Goals:",
        request.goals,
        "",
        `Request ID: ${request.id}`,
      ].join("\n"),
    });

    const acceptedRecipient = result.accepted.some((address) =>
      String(address).toLowerCase() === recipient.toLowerCase()
    );
    if (!acceptedRecipient) {
      console.error(`Trial request ${request.id} was saved, but SMTP did not accept the notification recipient.`);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`Trial request ${request.id} was saved, but Gmail SMTP failed to send its notification: ${err.message}`);
    return false;
  }
}

router.post("/", async (req, res, next) => {
  const body = req.body && typeof req.body === "object" ? req.body : {};
  const name = cleanText(body.name);
  const email = cleanText(body.email).toLowerCase();
  const phone = cleanText(body.phone);
  const preferredSession = cleanText(body.preferredSession);
  const experienceLevel = cleanText(body.experienceLevel);
  const goals = cleanText(body.goals);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({ error: "Enter a name between 2 and 100 characters." });
  }
  if (!validEmail || email.length > 254) {
    return res.status(400).json({ error: "Enter a valid email address." });
  }
  if (phone.length > 40) {
    return res.status(400).json({ error: "Phone number must be 40 characters or fewer." });
  }
  if (!trainingOptions.has(preferredSession)) {
    return res.status(400).json({ error: "Choose a valid training interest." });
  }
  if (!experienceOptions.has(experienceLevel)) {
    return res.status(400).json({ error: "Choose a valid training experience level." });
  }
  if (goals.length < 10 || goals.length > 1000) {
    return res.status(400).json({ error: "Tell us about your goals in 10 to 1000 characters." });
  }
  if (body.consent !== true) {
    return res.status(400).json({ error: "Consent is required before we can follow up." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO trial_requests
        (name, email, phone, preferred_session, experience_level, goals)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [name, email, phone || null, preferredSession, experienceLevel, goals]
    );
    const request = { id: result.rows[0].id, name, email, phone, preferredSession, experienceLevel, goals };
    const emailSent = await sendNotification(request);

    res.status(201).json({
      requestId: request.id,
      emailSent,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
