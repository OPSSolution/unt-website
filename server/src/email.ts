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
    })
  : null;

export async function sendQuoteEmail(data: Record<string, unknown>, language: string) {
  if (!transporter || !env.QUOTE_EMAIL_TO) throw new Error("Quote email is not configured");
  const customerEmail = typeof data.email === "string" ? data.email : "";
  if (!customerEmail) throw new Error("Customer email is missing");
  const lines = [
    `Submitted language: ${language === "km" ? "Khmer" : "English"}`,
    `Service: ${data.serviceType ?? ""}`,
    `Product: ${data.productName ?? "Not specified"}`,
    `Product category: ${data.productCategory ?? ""}`,
    `Preferred origin: ${data.originPreference ?? ""}`,
    `Estimated volume: ${data.estimatedVolume ?? ""}`,
    `Company: ${data.companyName ?? ""}`,
    `Contact: ${data.contactName ?? ""}`,
    `Email: ${data.email ?? ""}`,
    `Phone / Telegram: ${data.phone ?? ""}`,
    "",
    "Requirements:",
    String(data.notes ?? ""),
  ];
  const adminEmail = transporter.sendMail({
    from: env.EMAIL_FROM ?? env.SMTP_USER,
    to: env.QUOTE_EMAIL_TO,
    replyTo: customerEmail,
    subject: `New B2B quote request — ${String(data.companyName ?? data.contactName ?? "Website")}`,
    text: lines.join("\n"),
  });

  const isKhmer = language === "km";
  const customerLines = isKhmer
    ? [
        `សួស្តី ${String(data.contactName ?? "")},`,
        "",
        "យើងបានទទួលសំណើសុំតម្លៃ B2B របស់អ្នកដោយជោគជ័យ។ ក្រុមការងារ UNT នឹងពិនិត្យព័ត៌មាន និងទាក់ទងទៅអ្នកក្នុងពេលឆាប់ៗនេះ។",
        "",
        `សេវាកម្ម៖ ${String(data.serviceType ?? "")}`,
        `ប្រភេទផលិតផល៖ ${String(data.productCategory ?? "")}`,
        `ក្រុមហ៊ុន៖ ${String(data.companyName ?? "")}`,
        "",
        "សូមអរគុណដែលបានទាក់ទង Unique Noble Trading Co., Ltd.។",
      ]
    : [
        `Hello ${String(data.contactName ?? "")},`,
        "",
        "We successfully received your B2B quote request. The UNT team will review the details and contact you shortly.",
        "",
        `Service: ${String(data.serviceType ?? "")}`,
        `Product category: ${String(data.productCategory ?? "")}`,
        `Company: ${String(data.companyName ?? "")}`,
        "",
        "Thank you for contacting Unique Noble Trading Co., Ltd.",
      ];

  customerLines.splice(5, 0, `Product: ${String(data.productName ?? "Not specified")}`);

  const customerConfirmation = transporter.sendMail({
    from: env.EMAIL_FROM ?? env.SMTP_USER,
    to: customerEmail,
    replyTo: env.QUOTE_EMAIL_TO,
    subject: isKhmer ? "យើងបានទទួលសំណើសុំតម្លៃរបស់អ្នក" : "We received your B2B quote request",
    text: customerLines.join("\n"),
  });

  await Promise.all([adminEmail, customerConfirmation]);
}

export async function sendQuoteTestEmail() {
  if (!transporter || !env.QUOTE_EMAIL_TO) throw new Error("Quote email is not configured");
  await transporter.sendMail({
    from: env.EMAIL_FROM ?? env.SMTP_USER,
    to: env.QUOTE_EMAIL_TO,
    subject: "UNT website quote email test",
    text: "The UNT website quote notification email is configured correctly.",
  });
}
