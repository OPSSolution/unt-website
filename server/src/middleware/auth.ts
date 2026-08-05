import type { Request, Response, NextFunction } from "express";
import { supabase } from "../supabase.js";

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing authorization token" });
  }

  const token = authHeader.slice(7);

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  // Check admin role from user metadata or a dedicated admin table
  const isAdmin =
    user.app_metadata?.role === "admin" ||
    user.user_metadata?.role === "admin";

  if (!isAdmin) {
    return res.status(403).json({ error: "Forbidden: admin access required" });
  }

  next();
}
