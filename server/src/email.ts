import nodemailer from "nodemailer";
import { env } from "./config/env.js";

export const emailConfigured = Boolean(
  env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS && env.QUOTE_EMAIL_TO,
);

const transporter = emailConfigured
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: { user: env.SMTP_USER!, pass: env.SMTP_PASS! },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
      pool: true,
      maxConnections: 3,
      maxMessages: 100,
    })
  : null;

function text(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export async function sendQuoteEmail(data: Record<string, unknown>, language: string) {
  if (!transporter || !env.QUOTE_EMAIL_TO) {
    throw new Error("Quote email is not configured");
  }

  const customerEmail = text(data.email);
  if (!customerEmail) throw new Error("Customer email is missing");

  const productName = text(data.productName, "Not specified");
  const contactName = text(data.contactName, "Customer");
  const companyName = text(data.companyName, contactName);
  const from = env.EMAIL_FROM ?? env.SMTP_USER;

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
    transporter.sendMail({
      from,
      to: env.QUOTE_EMAIL_TO,
      replyTo: customerEmail,
      subject: `New B2B quote request — ${companyName}`,
      text: adminLines.join("\n"),
    }),
    transporter.sendMail({
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
  if (!transporter || !env.QUOTE_EMAIL_TO) {
    throw new Error("Quote email is not configured");
  }

  await transporter.sendMail({
    from: env.EMAIL_FROM ?? env.SMTP_USER,
    to: env.QUOTE_EMAIL_TO,
    subject: "UNT website quote email test",
    text: "The UNT website quote notification email is configured correctly.",
  });
}
