import { Router } from "express";
import { requireAdmin } from "../../middleware/auth.js";
import { auditAdminMutation } from "../../middleware/logger.js";
import productsRouter from "./products.js";
import articlesRouter from "./articles.js";
import partnersRouter from "./partners.js";
import heroRouter from "./hero.js";
import homepageRouter from "./homepage.js";

const router = Router();
// Anything mounted below this guard is admin-only by construction.
router.use(requireAdmin, auditAdminMutation);
router.use("/products", productsRouter);
router.use("/articles", articlesRouter);
router.use("/partners", partnersRouter);
router.use("/hero", heroRouter);
router.use("/homepage", homepageRouter);
export default router;
