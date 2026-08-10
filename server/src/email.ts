import { env } from "./config/env.js";

const RESEND_API_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "UNT Cambodia <onboarding@resend.dev>";
const BRAND_GREEN = "#009b67";
const BRAND_DARK = "#10182c";

export const emailConfigured = Boolean(env.RESEND_API_KEY && env.QUOTE_EMAIL_TO);

function text(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function detailRow(label: string, value: unknown) {
  return `<tr>
    <td style="padding:11px 14px;border-bottom:1px solid #e5eaf0;color:#65748b;font-size:13px;font-weight:700;width:38%;vertical-align:top">${escapeHtml(label)}</td>
    <td style="padding:11px 14px;border-bottom:1px solid #e5eaf0;color:${BRAND_DARK};font-size:14px;font-weight:600;vertical-align:top">${escapeHtml(text(value, "Not provided"))}</td>
  </tr>`;
}

function emailLayout(options: { eyebrow: string; title: string; intro: string; content: string; footer?: string }) {
  const logoUrl = `${env.PUBLIC_SITE_URL.replace(/\/$/, "")}/images/logos/image.png`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f6f8;font-family:Arial,'Noto Sans Khmer',sans-serif;color:${BRAND_DARK}">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f6f8">
    <tr><td align="center" style="padding:32px 12px">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#ffffff;border:1px solid #dfe7e4;border-radius:18px;overflow:hidden">
        <tr><td style="height:6px;background:${BRAND_GREEN};font-size:0;line-height:0">&nbsp;</td></tr>
        <tr><td style="padding:24px 28px 20px;border-bottom:1px solid #e5eaf0">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
            <td width="76" style="vertical-align:middle"><img src="${escapeHtml(logoUrl)}" width="68" alt="UNT Cambodia" style="display:block;width:68px;height:68px;object-fit:contain;border:0"></td>
            <td style="padding-left:14px;vertical-align:middle">
              <div style="font-size:21px;line-height:1.25;font-weight:800;color:${BRAND_DARK}">UNT Cambodia</div>
              <div style="margin-top:4px;font-size:12px;line-height:1.4;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:${BRAND_GREEN}">Unique Noble Trading Co., Ltd.</div>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:30px 28px 12px">
          <div style="font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:${BRAND_GREEN}">${escapeHtml(options.eyebrow)}</div>
          <h1 style="margin:8px 0 12px;font-size:27px;line-height:1.25;color:${BRAND_DARK}">${escapeHtml(options.title)}</h1>
          <p style="margin:0;color:#52627a;font-size:15px;line-height:1.7">${escapeHtml(options.intro)}</p>
        </td></tr>
        <tr><td style="padding:14px 28px 30px">${options.content}</td></tr>
        <tr><td style="padding:20px 28px;background:#f0faf6;border-top:1px solid #d7eee5;text-align:center;color:#607068;font-size:12px;line-height:1.6">
          ${options.footer ?? "Trusted global trading, sourcing and import solutions."}<br>
          <strong style="color:${BRAND_GREEN}">UNT Cambodia</strong>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

async function sendViaResend(message: { from: string; to: string; replyTo?: string; subject: string; text: string; html: string }) {
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: message.from,
      to: message.to,
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Resend API error ${response.status}: ${body}`);
  }
}

export async function sendQuoteEmail(data: Record<string, unknown>, language: string) {
  if (!emailConfigured || !env.QUOTE_EMAIL_TO) throw new Error("Quote email is not configured");

  const customerEmail = text(data.email);
  if (!customerEmail) throw new Error("Customer email is missing");

  const productName = text(data.productName, "Not specified");
  const contactName = text(data.contactName, "Customer");
  const companyName = text(data.companyName, contactName);
  const from = env.EMAIL_FROM ?? DEFAULT_FROM;
  const submittedLanguage = language === "km" ? "Khmer" : "English";

  const adminDetails = [
    ["Submitted language", submittedLanguage], ["Service", data.serviceType], ["Product", productName],
    ["Product category", data.productCategory], ["Preferred origin", data.originPreference],
    ["Estimated volume", data.estimatedVolume], ["Company", companyName], ["Contact", contactName],
    ["Email", customerEmail], ["Phone / Telegram", data.phone],
  ] as const;
  const adminLines = adminDetails.map(([label, value]) => `${label}: ${text(value, "Not provided")}`);
  adminLines.push("", "Requirements:", text(data.notes, "None provided"));
  const adminHtml = emailLayout({
    eyebrow: "New B2B enquiry",
    title: `Quote request from ${companyName}`,
    intro: "A new wholesale quote request was submitted through the UNT Cambodia website.",
    content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e1e8e5;border-radius:12px;overflow:hidden">${adminDetails.map(([label, value]) => detailRow(label, value)).join("")}</table>
      <div style="margin-top:18px;padding:16px 18px;background:#f6f8fa;border-left:4px solid ${BRAND_GREEN};border-radius:8px">
        <div style="margin-bottom:6px;color:#65748b;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.6px">Requirements</div>
        <div style="color:${BRAND_DARK};font-size:14px;line-height:1.65;white-space:pre-wrap">${escapeHtml(text(data.notes, "None provided"))}</div>
      </div>`,
  });

  const isKhmer = language === "km";
  const customerIntro = isKhmer
    ? "យើងបានទទួលសំណើសុំតម្លៃ B2B របស់អ្នកដោយជោគជ័យ។ ក្រុមការងារ UNT Cambodia នឹងពិនិត្យព័ត៌មាន និងទាក់ទងទៅអ្នកក្នុងពេលឆាប់ៗនេះ។"
    : "We successfully received your B2B quote request. The UNT Cambodia team will review your details and contact you shortly.";
  const customerDetails = [["Service", data.serviceType], ["Product", productName], ["Product category", data.productCategory], ["Company", companyName]] as const;
  const customerLines = [isKhmer ? `សួស្តី ${contactName},` : `Hello ${contactName},`, "", customerIntro, "", ...customerDetails.map(([label, value]) => `${label}: ${text(value, "Not provided")}`), "", "Thank you for contacting Unique Noble Trading Co., Ltd."];
  const customerHtml = emailLayout({
    eyebrow: isKhmer ? "សំណើរបស់អ្នកត្រូវបានទទួល" : "Request received",
    title: isKhmer ? `សួស្តី ${contactName}` : `Thank you, ${contactName}`,
    intro: customerIntro,
    content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e1e8e5;border-radius:12px;overflow:hidden">${customerDetails.map(([label, value]) => detailRow(label, value)).join("")}</table>
      <div style="margin-top:18px;padding:15px 18px;background:#f0faf6;border-radius:10px;color:#17684f;font-size:13px;line-height:1.6"><strong>What happens next?</strong><br>Our team will review the request and contact you using the details provided.</div>`,
  });

  await Promise.all([
    sendViaResend({ from, to: env.QUOTE_EMAIL_TO, replyTo: customerEmail, subject: `New B2B quote request — ${companyName}`, text: adminLines.join("\n"), html: adminHtml }),
    sendViaResend({ from, to: customerEmail, replyTo: env.QUOTE_EMAIL_TO, subject: isKhmer ? "យើងបានទទួលសំណើសុំតម្លៃរបស់អ្នក" : "We received your B2B quote request", text: customerLines.join("\n"), html: customerHtml }),
  ]);
}

export async function sendQuoteTestEmail() {
  if (!emailConfigured || !env.QUOTE_EMAIL_TO) throw new Error("Quote email is not configured");
  await sendViaResend({
    from: env.EMAIL_FROM ?? DEFAULT_FROM,
    to: env.QUOTE_EMAIL_TO,
    subject: "UNT Cambodia quote email test",
    text: "The UNT Cambodia quote notification email is configured correctly.",
    html: emailLayout({ eyebrow: "Configuration test", title: "Email is working", intro: "The UNT Cambodia quote notification email is configured correctly.", content: `<div style="padding:16px 18px;background:#f0faf6;border-radius:10px;color:#17684f;font-size:14px;line-height:1.6">You can now receive branded B2B quote notifications from the production website.</div>` }),
  });
}
