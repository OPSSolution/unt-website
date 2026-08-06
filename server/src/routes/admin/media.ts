import { createHmac, randomUUID } from "node:crypto";
import { Router } from "express";
import { env } from "../../config/env.js";

const router = Router();

router.post("/signature", (req, res) => {
  if (!env.IMAGEKIT_PUBLIC_KEY || !env.IMAGEKIT_PRIVATE_KEY) {
    return res.status(503).json({ error: "ImageKit is not configured on the server." });
  }

  const token = randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 20 * 60;
  const requestedFolder = typeof req.body?.folder === "string" ? req.body.folder : "media";
  const safeFolder = requestedFolder.replace(/[^a-zA-Z0-9/_-]/g, "").replace(/^\/+|\/+$/g, "");
  const folder = `/unt-website/${safeFolder || "media"}`;
  const signature = createHmac("sha1", env.IMAGEKIT_PRIVATE_KEY).update(token + expire).digest("hex");

  return res.json({ token, expire, signature, folder, publicKey: env.IMAGEKIT_PUBLIC_KEY });
});

export default router;
