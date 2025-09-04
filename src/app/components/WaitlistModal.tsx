'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DiscordInviteCard from './DiscordInviteCard';
import { useWaitlistModal } from '@/context/WaitlistModalContext';

type FormState = {
  first_name: string;
  last_name: string;
  email: string;
  org: string;
  sector: string;
  country: string;
};

const initial: FormState = {
  first_name: '',
  last_name: '',
  email: '',
  org: '',
  sector: '',
  country: '',
};

export default function WaitlistModal() {
  const { isOpen, close } = useWaitlistModal();
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [showDiscord, setShowDiscord] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // === TOAST STATE ===
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // reset form when closing
  useEffect(() => {
    if (!isOpen) setForm(initial);
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  // Auto-hide toast after 5s
  useEffect(() => {
    if (!toastOpen) return;
    const id = setTimeout(() => setToastOpen(false), 5000);
    return () => clearTimeout(id);
  }, [toastOpen]);

  const set =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      console.log('[waitlist] submit clicked');

      const payload = {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        org: form.org,
        sector: form.sector,
        country: form.country,
      };

      // 1) Call your insert route
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log('[waitlist] /api/waitlist status:', res.status);
      const resText = await res.text();
      console.log('[waitlist] /api/waitlist body:', resText);

      if (!res.ok) {
        alert(`Join failed (${res.status}). Server said: ${resText}`);
        return;
      }

      // 2) Call the email notify endpoint
      const notifyRes = await fetch('/api/waitlist/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          first_name: form.first_name,
        }),
      });

      const notifyText = await notifyRes.text();
      console.log('[notify] status:', notifyRes.status);
      console.log('[notify] body:', notifyText);

      if (!notifyRes.ok) {
        alert(`Email send failed (${notifyRes.status}). Server said: ${notifyText}`);
        return;
      }

      // === SUCCESS ===
      setToastMsg('Request captured ! Please check your email for a welcome message.');
      setToastOpen(true);

      setShowDiscord(true);
      close();
      setForm(initial);
    } catch (err) {
      console.error(err);
      alert('Unexpected error; check console for details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* MODAL OVERLAY + PANEL */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              key="panel"
              ref={panelRef}
              className="fixed top-0 right-0 h-full w-[min(92vw,640px)] z-[95] bg-white shadow-2xl p-6 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="waitlist-title"
            >
              <div className="flex items-center justify-between">
                <h2 id="waitlist-title" className="text-2xl font-semibold">
                  Secure Your Spot and See How Data Becomes Effortless with Spryntr
                </h2>
                <button
                  onClick={close}
                  aria-label="Close"
                  className="rounded p-2 hover:bg-gray-100"
                >
                  ×
                </button>
              </div>

              <form onSubmit={onSubmit} className="mt-6 space-y-5">
                {/* Honeypot for bots */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm">
                      First name: <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={form.first_name}
                      onChange={set('first_name')}
                      className="mt-1 w-full border-b border-black/60 bg-transparent px-1 py-2 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm">
                      Last name: <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      value={form.last_name}
                      onChange={set('last_name')}
                      className="mt-1 w-full border-b border-black/60 bg-transparent px-1 py-2 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm">
                    Email: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={set('email')}
                    className="mt-1 w-full border-b border-black/60 bg-transparent px-1 py-2 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm">
                    Organization/Institution: <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={form.org}
                    onChange={set('org')}
                    className="mt-1 w-full border-b border-black/60 bg-transparent px-1 py-2 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm">
                      Sector: <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={form.sector}
                      onChange={set('sector')}
                      className="mt-1 w-full border-b border-black/60 bg-transparent px-1 py-2 outline-none"
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option>Public sector</option>
                      <option>Healthcare</option>
                      <option>Education</option>
                      <option>Finance</option>
                      <option>Energy</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm">
                      Country: <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={form.country}
                      onChange={set('country')}
                      className="mt-1 w-full border-b border-black/60 bg-transparent px-1 py-2 outline-none"
                    >
                      <option value="" disabled>
                        Select
                      </option>
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

      {/* DISCORD CARD */}
      <DiscordInviteCard
        show={showDiscord}
        onClose={() => setShowDiscord(false)}
      />

      {/* TOAST */}
      <div
        className={`fixed top-4 right-4 z-[100] w-[92vw] max-w-sm transition-all ${
          toastOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
        role="status"
        aria-live="polite"
      >
        <div className="rounded-2xl border border-green-200 bg-white shadow-lg">
          <div className="flex items-start gap-3 p-4">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-green-500" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Submission Successful</p>
              <p className="mt-1 text-sm text-gray-700">{toastMsg}</p>
            </div>
            <button
              onClick={() => setToastOpen(false)}
              className="rounded-lg p-1 hover:bg-gray-100"
              aria-label="Dismiss"
              type="button"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
