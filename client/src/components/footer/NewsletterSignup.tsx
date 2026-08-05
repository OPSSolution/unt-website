import { FormEvent, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

const SUCCESS_DURATION = 5000;

export const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;

    window.clearTimeout(resetTimer.current);
    setSubscribed(true);
    setEmail('');
    resetTimer.current = window.setTimeout(() => setSubscribed(false), SUCCESS_DURATION);
  };

  if (subscribed) {
    return (
      <div role="status" className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center space-x-2">
        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
        <span>Subscribed successfully! Briefings sent bi-weekly.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <label htmlFor="footer-newsletter-email" className="sr-only">Business email</label>
        <input
          id="footer-newsletter-email"
          type="email"
          required
          placeholder="Enter business email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors pr-10"
        />
        <button
          type="submit"
          aria-label="Subscribe to market intelligence"
          className="absolute right-1 top-1 bottom-1 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center justify-center transition-colors shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
};
