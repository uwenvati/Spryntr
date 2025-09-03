'use client';
import { motion, AnimatePresence } from 'framer-motion';

const DISCORD_INVITE = 'https://discord.gg/U82NkuVc';

export default function DiscordInviteCard({
  show, onClose,
}: { show: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }} transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-[100] w-[min(92vw,560px)] rounded-2xl bg-black text-white shadow-2xl"
          role="dialog" aria-label="Join our Discord"
        >
          <div className="p-5">
            <button onClick={onClose} aria-label="Close"
              className="mb-2 rounded hover:bg-white/10 p-1">×</button>
            <h3 className="text-xl font-semibold leading-snug">
              Join our Discord to connect with early adopters and get exclusive Spryntr updates.
            </h3>
            <div className="mt-4">
              <a href={DISCORD_INVITE} target="_blank" rel="noreferrer"
                 className="inline-flex items-center rounded-xl bg-white text-black px-4 py-2 font-medium">
                Join the community
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
