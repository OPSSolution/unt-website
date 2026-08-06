import type { RequestHandler } from "express";

const SUMMARY_WINDOW_MS = 10_000;
const SLOW_REQUEST_MS = 500;

interface TrafficWindow {
  startedAt: number;
  total: number;
  totalDurationMs: number;
  maxDurationMs: number;
  slow: number;
  errors: number;
  routes: Map<string, number>;
}

let traffic: TrafficWindow = createTrafficWindow();

function createTrafficWindow(): TrafficWindow {
  return {
    startedAt: Date.now(),
    total: 0,
    totalDurationMs: 0,
    maxDurationMs: 0,
    slow: 0,
    errors: 0,
    routes: new Map(),
  };
}

function normalizePath(path: string) {
  return path
    .split("?", 1)[0]!
    .replace(/[0-9a-f]{8}-[0-9a-f-]{27,}/gi, ":id");
}

const summaryTimer = setInterval(() => {
  const completed = traffic;
  traffic = createTrafficWindow();
  if (completed.total === 0) return;

  const elapsedSeconds = Math.max((Date.now() - completed.startedAt) / 1_000, 1);
  console.info(JSON.stringify({
    type: "traffic_summary",
    window_seconds: Math.round(elapsedSeconds),
    requests: completed.total,
    requests_per_second: Number((completed.total / elapsedSeconds).toFixed(2)),
    average_duration_ms: Math.round(completed.totalDurationMs / completed.total),
    max_duration_ms: completed.maxDurationMs,
    slow_requests: completed.slow,
    errors: completed.errors,
    routes: Object.fromEntries([...completed.routes.entries()].sort((a, b) => b[1] - a[1])),
  }));
}, SUMMARY_WINDOW_MS);

// Do not keep tests or one-off scripts alive solely for traffic reporting.
summaryTimer.unref();

export const requestLogger: RequestHandler = (req, res, next) => {
  const startedAt = Date.now();
  res.on("finish", () => {
    if (!req.originalUrl.startsWith("/api/")) return;
    const durationMs = Date.now() - startedAt;
    const route = `${req.method} ${normalizePath(req.originalUrl)}`;
    traffic.total += 1;
    traffic.totalDurationMs += durationMs;
    traffic.maxDurationMs = Math.max(traffic.maxDurationMs, durationMs);
    traffic.routes.set(route, (traffic.routes.get(route) ?? 0) + 1);
    if (durationMs >= SLOW_REQUEST_MS) traffic.slow += 1;
    if (res.statusCode >= 400) traffic.errors += 1;

    // Preserve detailed evidence for failures and genuinely slow requests
    // without making normal traffic logging itself a performance problem.
    if (res.statusCode >= 400 || durationMs >= SLOW_REQUEST_MS) {
      console.warn(JSON.stringify({
        type: "request_alert",
        method: req.method,
        path: normalizePath(req.originalUrl),
        status: res.statusCode,
        duration_ms: durationMs,
      }));
    }
  });
  next();
};

export const auditAdminMutation: RequestHandler = (req, res, next) => {
  res.on("finish", () => {
    if (req.method !== "GET") {
      console.info(JSON.stringify({
        type: "admin_audit",
        admin_id: req.admin?.id,
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
      }));
    }
  });
  next();
};
