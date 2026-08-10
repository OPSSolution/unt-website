import dns from "node:dns/promises";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import { env } from "./config/env.js";

export const emailConfigured = Boolean(
  env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS && env.QUOTE_EMAIL_TO,
);

// Nodemailer decides whether to even attempt IPv4 DNS resolution based on
// whether the host machine *appears* to have an IPv4 network interface
// (see nodemailer/lib/shared isFamilySupported). On some containerized hosts
// (e.g. Render) that check comes back false even though IPv4 egress works
// fine, so it resolves only AAAA records and tries to connect over IPv6,
// which then fails with ENETUNREACH. Resolving the A record ourselves and
// connecting to that literal IP sidesteps nodemailer's broken heuristic
// entirely (it skips its own resolver whenever `host` is already an IP).
async function resolveIPv4(hostname: string): Promise<string> {
  try {
    const [address] = await dns.resolve4(hostname);
    return address ?? hostname;
  } catch {
    return hostname;
  }
}

const smtpHost = env.SMTP_HOST ? await resolveIPv4(env.SMTP_HOST) : undefined;

const smtpOptions = {
  host: smtpHost,
  // Required for TLS certificate validation and SNI since `host` above is a
  // literal IP: nodemailer only sends the servername if told to explicitly.
  servername: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,
  auth: { user: env.SMTP_USER!, pass: env.SMTP_PASS! },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 10_000,
  pool: true,
  maxConnections: 3,
} as SMTPTransport.Options;

const transporter = emailConfigured ? nodemailer.createTransport(smtpOptions) : null;

export async function sendQuoteEmail(data: Record<string, unknown>, language: string) {
  if (!transporter || !env.QUOTE_EMAIL_TO) throw new Error("Quote email is not configured");
  const customerEmail = typeof data.email === "string" ? data.email : "";
  if (!customerEmail) throw new Error("Customer email is missing");
  const lines = [
    `Submitted language: ${language === "km" ? "Khmer" : "English"}`,
    `Service: ${data.serviceType ?? ""}`,
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

  await Promise.all([
    transporter.sendMail({
      from: env.EMAIL_FROM ?? env.SMTP_USER,
      to: env.QUOTE_EMAIL_TO,
      replyTo: customerEmail,
      subject: `New B2B quote request — ${String(data.companyName ?? data.contactName ?? "Website")}`,
      text: lines.join("\n"),
    }),
    transporter.sendMail({
      from: env.EMAIL_FROM ?? env.SMTP_USER,
      to: customerEmail,
      replyTo: env.QUOTE_EMAIL_TO,
      subject: isKhmer ? "យើងបានទទួលសំណើសុំតម្លៃរបស់អ្នក" : "We received your B2B quote request",
      text: customerLines.join("\n"),
    }),
  ]);
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
