import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { supabase } from "../supabase.js";
import { validateBody } from "../middleware/validate.js";
import { quoteSubmissionSchema } from "../schemas/content.js";
import { emailConfigured, sendQuoteEmail } from "../email.js";

const router = Router();

const quoteSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many quote requests. Please try again later." },
});

// Public endpoint: validate and persist a client B2B quote request.
router.post("/", quoteSubmissionLimiter, validateBody(quoteSubmissionSchema), async (req, res) => {
  const { language, ...data } = req.body;
  const { data: inserted, error } = await supabase
    .from("quotes")
    .insert({ data, language })
    .select("id, created_at")
    .single();

  if (error || !inserted) {
    console.error("Quote persistence failed:", error);
    return res.status(500).json({ error: "Unable to save quote request" });
  }

  if (emailConfigured) {
    // The quote is safely stored. SMTP delivery continues without delaying the
    // visitor's confirmation screen.
    void sendQuoteEmail(data, language).catch((emailError) => {
      console.error("Quote email delivery failed:", emailError);
    });
  }

  return res.status(201).json({
    id: inserted.id,
    created_at: inserted.created_at,
    email_queued: emailConfigured,
  });
});

export default router;
