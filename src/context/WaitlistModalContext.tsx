'use client';
import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

type Ctx = { open: () => void; close: () => void; isOpen: boolean };
const WaitlistCtx = createContext<Ctx | null>(null);

export function WaitlistModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo<Ctx>(() => ({
    isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false)
  }), [isOpen]);
  return <WaitlistCtx.Provider value={value}>{children}</WaitlistCtx.Provider>;
}

export function useWaitlistModal() {
  const ctx = useContext(WaitlistCtx);
  if (!ctx) throw new Error('useWaitlistModal must be used within WaitlistModalProvider');
  return ctx;
}
