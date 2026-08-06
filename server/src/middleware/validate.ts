import type { RequestHandler } from "express";
import type { ZodType } from "zod";

export function validateBody(schema: ZodType): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Invalid request body",
        issues: result.error.issues.map(({ path, message }) => ({ path: path.join("."), message })),
      });
    }
    req.body = result.data;
    next();
  };
}

function omitBlankTranslations(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  return Object.fromEntries(Object.entries(body).filter(([, value]) =>
    value !== "" && !(Array.isArray(value) && value.length === 0)));
}

export function validateLocalizedBody(schema: ZodType): RequestHandler {
  return (req, res, next) => {
    const input = req.headers["x-content-language"] === "km"
      ? omitBlankTranslations(req.body)
      : req.body;
    const result = schema.safeParse(input);
    if (!result.success) {
      return res.status(400).json({
        error: "Invalid request body",
        issues: result.error.issues.map(({ path, message }) => ({ path: path.join("."), message })),
      });
    }
    req.body = result.data;
    next();
  };
}

export function validateParams(schema: ZodType): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.params);
    if (!result.success) return res.status(400).json({ error: "Invalid route parameters" });
    next();
  };
}
