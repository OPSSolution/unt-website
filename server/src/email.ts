import { env } from "./config/env.js";

// Gmail SMTP is unreachable from Render (connections over both IPv6 and IPv4
// time out — Google appears to block/throttle direct SMTP from shared cloud
// IP ranges). Resend sends over HTTPS instead of SMTP, which is never
// blocked, so it's used here instead of nodemailer.
const RESEND_API_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "UNT Website <onboarding@resend.dev>";

export const emailConfigured = Boolean(env.RESEND_API_KEY && env.QUOTE_EMAIL_TO);

function text(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

async function sendViaResend(message: { from: string; to: string; replyTo?: string; subject: string; text: string }) {
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: message.from,
      to: message.to,
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Resend API error ${response.status}: ${body}`);
  }
}

export async function sendQuoteEmail(data: Record<string, unknown>, language: string) {
  if (!emailConfigured || !env.QUOTE_EMAIL_TO) {
    throw new Error("Quote email is not configured");
  }

  const customerEmail = text(data.email);
  if (!customerEmail) throw new Error("Customer email is missing");

  const productName = text(data.productName, "Not specified");
  const contactName = text(data.contactName, "Customer");
  const companyName = text(data.companyName, contactName);
  const from = env.EMAIL_FROM ?? DEFAULT_FROM;

  const adminLines = [
    `Submitted language: ${language === "km" ? "Khmer" : "English"}`,
    `Service: ${text(data.serviceType)}`,
    `Product: ${productName}`,
    `Product category: ${text(data.productCategory)}`,
    `Preferred origin: ${text(data.originPreference)}`,
    `Estimated volume: ${text(data.estimatedVolume)}`,
    `Company: ${companyName}`,
    `Contact: ${contactName}`,
    `Email: ${customerEmail}`,
    `Phone / Telegram: ${text(data.phone)}`,
    "",
    "Requirements:",
    text(data.notes, "None provided"),
  ];

  const isKhmer = language === "km";
  const customerLines = isKhmer
    ? [
        `សួស្តី ${contactName},`,
        "",
        "យើងបានទទួលសំណើសុំតម្លៃ B2B របស់អ្នកដោយជោគជ័យ។ ក្រុមការងារ UNT នឹងពិនិត្យព័ត៌មាន និងទាក់ទងទៅអ្នកក្នុងពេលឆាប់ៗនេះ។",
        "",
        `សេវាកម្ម៖ ${text(data.serviceType)}`,
        `ផលិតផល៖ ${productName}`,
        `ប្រភេទផលិតផល៖ ${text(data.productCategory)}`,
        `ក្រុមហ៊ុន៖ ${companyName}`,
        "",
        "សូមអរគុណដែលបានទាក់ទង Unique Noble Trading Co., Ltd.",
      ]
    : [
        `Hello ${contactName},`,
        "",
        "We successfully received your B2B quote request. The UNT team will review the details and contact you shortly.",
        "",
        `Service: ${text(data.serviceType)}`,
        `Product: ${productName}`,
        `Product category: ${text(data.productCategory)}`,
        `Company: ${companyName}`,
        "",
        "Thank you for contacting Unique Noble Trading Co., Ltd.",
      ];

  await Promise.all([
    sendViaResend({
      from,
      to: env.QUOTE_EMAIL_TO,
      replyTo: customerEmail,
      subject: `New B2B quote request — ${companyName}`,
      text: adminLines.join("\n"),
    }),
    sendViaResend({
      from,
      to: customerEmail,
      replyTo: env.QUOTE_EMAIL_TO,
      subject: isKhmer
        ? "យើងបានទទួលសំណើសុំតម្លៃរបស់អ្នក"
        : "We received your B2B quote request",
      text: customerLines.join("\n"),
    }),
  ]);
}

export async function sendQuoteTestEmail() {
  if (!emailConfigured || !env.QUOTE_EMAIL_TO) {
    throw new Error("Quote email is not configured");
  }

  await sendViaResend({
    from: env.EMAIL_FROM ?? DEFAULT_FROM,
    to: env.QUOTE_EMAIL_TO,
    subject: "UNT website quote email test",
    text: "The UNT website quote notification email is configured correctly.",
  });
}
