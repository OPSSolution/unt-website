import type { Request } from "express";
import type { RequestHandler } from "express";

export type ContentLanguage = "en" | "km";
export type Translations = Record<string, Record<string, unknown>>;

const SHARED_FIELD = /(^id$|_id$|image|avatar|url|flag|created_at|updated_at|sort_order|featured|available)/i;

function emptyLocalizedValue(key: string, value: unknown) {
  if (SHARED_FIELD.test(key) || typeof value === "number" || typeof value === "boolean" || value === null) return value;
  if (typeof value === "string") return "";
  if (Array.isArray(value)) return [];
  return value;
}

function blankLocalizedFields(value: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(value).map(([key, field]) => [key, emptyLocalizedValue(key, field)]));
}

export function requestLanguage(req: Request): ContentLanguage {
  const value = req.headers["x-content-language"] ?? req.query.lang;
  return value === "km" ? "km" : "en";
}

export const requireContentLanguage: RequestHandler = (req, res, next) => {
  const value = req.headers["x-content-language"];
  if (value !== "en" && value !== "km") {
    return res.status(400).json({ error: "Missing or invalid X-Content-Language header" });
  }
  next();
};

export const protectLanguageIntegrity: RequestHandler = (req, res, next) => {
  const language = req.headers["x-content-language"];
  if (language === "en" && /[\u1780-\u17ff]/u.test(JSON.stringify(req.body))) {
    return res.status(400).json({
      error: "English content contains Khmer script. Switch to Khmer before saving.",
    });
  }
  next();
};

export function localizeRow<T extends Record<string, unknown>>(row: T, language: ContentLanguage): T {
  const translations = (row.translations ?? {}) as Translations;
  const localized = language === "km" ? translations.km : undefined;
  const { translations: _translations, ...base } = row;
  return (language === "km"
    ? { ...blankLocalizedFields(base), ...(localized ?? {}) }
    : base) as T;
}

export function localizeRows<T extends Record<string, unknown>>(rows: T[] | null, language: ContentLanguage) {
  return (rows ?? []).map((row) => localizeRow(row, language));
}

export function localizedSection(data: unknown, language: ContentLanguage) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return data;
  const value = data as Record<string, unknown>;
  if (!("en" in value) && !("km" in value)) return value;
  const english = value.en && typeof value.en === "object" ? value.en : {};
  const khmer = value.km && typeof value.km === "object" ? value.km : {};
  return language === "km"
    ? { ...blankLocalizedFields(english as Record<string, unknown>), ...khmer }
    : english;
}
