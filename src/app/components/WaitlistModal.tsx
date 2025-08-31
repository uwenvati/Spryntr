'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DiscordInviteCard from './DiscordInviteCard';
import { useWaitlistModal } from '@/context/WaitlistModalContext';

type FormState = {
  first_name: string; last_name: string; email: string;
  org: string; sector: string; country: string;
};

const initial: FormState = {
  first_name: '', last_name: '', email: '', org: '', sector: '', country: ''
};

export default function WaitlistModal() {
  const { isOpen, close } = useWaitlistModal();
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [showDiscord, setShowDiscord] = useState(false);
  const [openedAt, setOpenedAt] = useState<number | null>(null); // ⬅️ when modal opened
  const panelRef = useRef<HTMLDivElement>(null);

  // reset form when closing
  useEffect(() => { if (!isOpen) setForm(initial); }, [isOpen]);

  // record when the modal was opened (for simple anti-bot timing on server)
  useEffect(() => { if (isOpen) setOpenedAt(Date.now()); }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Collect UTM params from current URL if present
      const p = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const utm = {
        utm_source: p?.get('utm_source') || '',
        utm_medium: p?.get('utm_medium') || '',
        utm_campaign: p?.get('utm_campaign') || '',
        utm_term: p?.get('utm_term') || '',
        utm_content: p?.get('utm_content') || '',
      };

      // Map your fields to the API shape
      const payload = {
        org_name: form.org,
        contact_name: `${form.first_name} ${form.last_name}`.trim(),
        email: form.email,
        role: '',
        website: '',
        industry: form.sector,
        size: '',
        use_case: '',
        source: 'waitlist_modal',
        ...utm,
        company: '',                 // honeypot (must remain empty for humans)
        t: openedAt ?? Date.now(),   // when the user opened the modal
      };

      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to join waitlist');

      // success → show Discord card and close modal
      setShowDiscord(true);
      close();
    } catch (err: any) {
      alert(err?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  return (
    <>
      {/* MODAL OVERLAY + PANEL */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              key="panel"
              ref={panelRef}
              className="fixed top-0 right-0 h-full w-[min(92vw,640px)] z-[95] bg-white shadow-2xl p-6 overflow-y-auto"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              role="dialog" aria-modal="true" aria-labelledby="waitlist-title"
            >
              <div className="flex items-center justify-between">
                <h2 id="waitlist-title" className="text-2xl font-semibold">
                  Secure Your Spot and See How Data Becomes Effortless with Spryntr
                </h2>
                <button onClick={close} aria-label="Close" className="rounded p-2 hover:bg-gray-100">×</button>
              </div>

              <form onSubmit={onSubmit} className="mt-6 space-y-5">
                {/* Honeypot for bots (hidden from users) */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm">First name: <span className="text-red-500">*</span></label>
                    <input required value={form.first_name} onChange={set('first_name')}
                           className="mt-1 w-full border-b border-black/60 bg-transparent px-1 py-2 outline-none" />
                  </div>
                  <div>
                    <label className="text-sm">Last name: <span className="text-red-500">*</span></label>
                    <input required value={form.last_name} onChange={set('last_name')}
                           className="mt-1 w-full border-b border-black/60 bg-transparent px-1 py-2 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-sm">Email: <span className="text-red-500">*</span></label>
                  <input type="email" required value={form.email} onChange={set('email')}
                         className="mt-1 w-full border-b border-black/60 bg-transparent px-1 py-2 outline-none" />
                </div>

                <div>
                  <label className="text-sm">Organization/Institution: <span className="text-red-500">*</span></label>
                  <input required value={form.org} onChange={set('org')}
                         className="mt-1 w-full border-b border-black/60 bg-transparent px-1 py-2 outline-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm">Sector: <span className="text-red-500">*</span></label>
                    <select required value={form.sector} onChange={set('sector')}
                            className="mt-1 w-full border-b border-black/60 bg-transparent px-1 py-2 outline-none">
                      <option value="" disabled>Select</option>
                      <option>Public sector</option>
                      <option>Healthcare</option>
                      <option>Education</option>
                      <option>Finance</option>
                      <option>Energy</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm">Country: <span className="text-red-500">*</span></label>
                    <select required value={form.country} onChange={set('country')}
                            className="mt-1 w-full border-b border-black/60 bg-transparent px-1 py-2 outline-none">
                      <option value="" disabled>Select</option>
                      <option>Nigeria</option>
                      <option>Ghana</option>
                      <option>Kenya</option>
                      <option>South Africa</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 inline-flex items-center justify-center rounded-xl bg-black text-white px-5 py-2 font-semibold"
                >
                  {submitting ? 'Submitting…' : 'Submit'}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* DISCORD CARD (after submit) */}
      <DiscordInviteCard show={showDiscord} onClose={() => setShowDiscord(false)} />
    </>
  );
}
