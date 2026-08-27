import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { env } from "./config/env.js";
import { requestLogger } from "./middleware/logger.js";
import { errorHandler, notFound } from "./middleware/error.js";
import adminRouter from "./routes/admin/index.js";
import productsRouter from "./routes/products.js";
import articlesRouter from "./routes/articles.js";
import partnersRouter from "./routes/partners.js";
import homepageRouter from "./routes/homepage.js";
import heroRouter from "./routes/hero.js";
import quotesRouter from "./routes/quotes.js";
import siteStatsRouter from "./routes/siteStats.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDistPath = path.join(__dirname, "../../client/dist");

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  // Render sits in front of us as a reverse proxy; without this, req.ip
  // resolves to the proxy's address instead of the visitor's.
  app.set("trust proxy", 1);
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors({ origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN }));
  app.use(express.json({
    limit: "1mb",
    type: (req) => {
      const ct = req.headers["content-type"] ?? "";
      return ct.startsWith("application/json");
    },
  }));
  app.use(requestLogger);
  const publicApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 2_000,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    // Local development polling and React StrictMode should never lock the
    // developer out. Production remains protected.
    skip: () => env.NODE_ENV !== "production",
    message: { error: "Too many requests. Please try again shortly." },
  });
  const adminApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    skip: () => env.NODE_ENV !== "production",
    message: { error: "Too many admin requests. Please try again shortly." },
  });

  app.use("/api/products", publicApiLimiter, productsRouter);
  app.use("/api/articles", publicApiLimiter, articlesRouter);
  app.use("/api/partners", publicApiLimiter, partnersRouter);
  app.use("/api/hero", publicApiLimiter, heroRouter);
  app.use("/api/homepage", publicApiLimiter, homepageRouter);
  app.use("/api/quotes", publicApiLimiter, quotesRouter);
  app.use("/api/site-stats", publicApiLimiter, siteStatsRouter);
  app.use("/api/admin", adminApiLimiter, adminRouter);

  app.get(["/admin", "/admin/"], (_req, res) => res.sendFile(path.join(clientDistPath, "admin.html")));
  app.use(express.static(clientDistPath));
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
