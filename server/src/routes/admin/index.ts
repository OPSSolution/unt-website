import { Router } from "express";
import express from "express";
import { requireAdmin } from "../../middleware/auth.js";
import { auditAdminMutation } from "../../middleware/logger.js";
import productsRouter from "./products.js";
import articlesRouter from "./articles.js";
import partnersRouter from "./partners.js";
import heroRouter from "./hero.js";
import homepageRouter from "./homepage.js";
import mediaRouter from "./media.js";
import quotesRouter from "./quotes.js";
import settingsRouter from "./settings.js";
import siteStatsRouter from "./siteStats.js";
import { protectLanguageIntegrity, requireContentLanguage } from "../../i18n.js";

const router = Router();
// Anything mounted below this guard is admin-only by construction.
const isBinaryUpload = (req: express.Request) => {
  const ct = req.headers["content-type"] ?? "";
  return ct.startsWith("image/") || ct.startsWith("video/") || ct.startsWith("application/octet-stream");
};

router.use(requireAdmin);
router.use((req, res, next) => isBinaryUpload(req) ? next() : requireContentLanguage(req, res, next));
router.use((req, res, next) => isBinaryUpload(req) ? next() : protectLanguageIntegrity(req, res, next));
router.use(auditAdminMutation);
router.use("/products", productsRouter);
router.use("/articles", articlesRouter);
router.use("/partners", partnersRouter);
router.use("/hero", heroRouter);
router.use("/homepage", homepageRouter);
router.use("/media", mediaRouter);
router.use("/quotes", quotesRouter);
router.use("/settings", settingsRouter);
router.use("/site-stats", siteStatsRouter);
export default router;
