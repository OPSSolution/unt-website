import { Router } from "express";
import { supabase } from "../supabase.js";
import { validateBody } from "../middleware/validate.js";
import { quoteSubmissionSchema } from "../schemas/content.js";
import { emailConfigured, sendQuoteEmail } from "../email.js";

const router = Router();

// Public endpoint: persist a client B2B quote request.
router.post("/", validateBody(quoteSubmissionSchema), async (req, res) => {
  const { language, ...data } = req.body;
  const { data: inserted, error } = await supabase
    .from("quotes")
    .insert({ data, language })
    .select()
    .single();
  if (error) return res.status(500).json({ error: error.message });
  const emailQueued = emailConfigured;
  if (emailConfigured) {
    // The quote is already safely stored. Do not keep the visitor waiting for
    // external SMTP delivery before confirming their submission.
    void sendQuoteEmail(data, language).catch((error) => {
      console.error("Quote email delivery failed:", error);
    });
  }
  return res.status(201).json({ ...inserted, email_queued: emailQueued });
});

export default router;
