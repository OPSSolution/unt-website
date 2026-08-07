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
  let emailSent = false;
  let emailError: string | undefined;
  if (emailConfigured) {
    try {
      await sendQuoteEmail(data, language);
      emailSent = true;
    } catch (error) {
      emailError = error instanceof Error ? error.message : "Email delivery failed";
      console.error("Quote email delivery failed:", error);
    }
  }
  return res.status(201).json({ ...inserted, email_sent: emailSent, ...(emailError ? { email_error: emailError } : {}) });
});

export default router;
