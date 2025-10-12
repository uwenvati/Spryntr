'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, ShieldCheck, Zap } from 'lucide-react'
import { useWaitlistModal } from '@/context/WaitlistModalContext'

export default function HeroCortex() {
  const { open: openWaitlist } = useWaitlistModal()

  return (
    <section className="relative isolate overflow-hidden pt-40 md:pt-48 pb-20 md:pb-28 bg-black text-white">
      {/* Neutral white auras (no color) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-[-12%] h-[60rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.18), transparent 70%)' }}
        />
        <div
          className="absolute left-1/2 top-[18%] h-[40rem] w-[70rem] -translate-x-1/2 rotate-12 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(closest-side, rgba(255,255,255,0.12), transparent 70%)' }}
        />
      </div>

      {/* Fading white line grid */}
      <FadingGrid />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs/relaxed text-white/70 backdrop-blur"
        >
          <span className="inline-flex h-2 w-2 rounded-full bg-white/80"></span>
          Now powering AI-ready data experiences
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
        >
          Meet <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">Cortex</span> — your
          <br className="hidden sm:block" />
          <span className="text-white/80">data nerve center</span>
        </motion.h1>

        {/* Subcopy */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="mt-5 max-w-2xl text-base text-white/70 sm:text-lg"
        >
          Ingest messy data, model relationships, and unlock real-time insights. Cortex gives teams a
          composable, secure foundation to ship AI features faster — without wrestling the plumbing.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          {/* Primary: opens waitlist */}
          <button
            onClick={openWaitlist}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            See Cortex in action
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>

          {/* Secondary: Docs */}
          <Link
            href="/resources/docs"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            <Play className="h-4 w-4" />
            Read the docs
          </Link>
        </motion.div>

        {/* Preview panel (dots only, no lines) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="relative mx-auto mt-12 w-full max-w-5xl"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
            <div className="rounded-xl border border-white/10 bg-black/60 p-4">
              {/* Fake top bar */}
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
                <span className="ml-3 text-xs text-white/50">cortex.run — live preview</span>
              </div>

              {/* Node field (dots only) */}
              <div className="relative h-[360px] overflow-hidden rounded-lg border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                <FloatingDots />
                {/* Soft white sweep */}
                <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]">
                  <div
                    className="absolute -left-1/4 top-0 h-[200%] w-1/2 -skew-x-12 opacity-10 blur-md animate-[shine_3.8s_linear_infinite]"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)' }}
                  />
                </div>
                <style jsx>{`
                  @keyframes shine { 0% { transform: translateX(-20%); } 100% { transform: translateX(220%); } }
                `}</style>
              </div>
            </div>
          </div>

          <p className="mt-3 text-center text-xs text-white/50">
            Live demo access is limited —{' '}
            <button onClick={openWaitlist} className="underline decoration-white/30 underline-offset-2 hover:text-white">
              join the waitlist
            </button>{' '}
            to see more.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ===== Fading white grid background ===== */
/* ===== Brighter fading white grid background ===== */
function FadingGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* Base grid with brighter pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.12, 0.22, 0.12] }} // brighter than before
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      >
        <svg className="h-full w-full text-white" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              {/* strokeWidth bumped from 1 → 1.2 for more visible lines */}
              <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* Brighter sweeping fade */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.0, x: '-20%' }}
        animate={{ opacity: [0.0, 0.18, 0.0], x: ['-20%', '20%', '60%'] }} // brighter sweep
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(40% 60% at 30% 50%, rgba(255,255,255,0.25), transparent 60%)',
        }}
      />
    </div>
  )
}


/* ===== Animated dots (no lines) ===== */
function FloatingDots() {
  const dots = Array.from({ length: 28 })
  return (
    <div className="absolute inset-0">
      {dots.map((_, i) => {
        const top = (i * 37) % 95
        const left = (i * 53) % 95
        const delay = (i % 7) * 0.25
        const duration = 3 + (i % 5) * 0.6
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 0.6, delay }}
            className="absolute"
            style={{ top: `${top}%`, left: `${left}%` }}
          >
            <motion.div
              className="h-2 w-2 rounded-full bg-white/70 shadow-[0_0_16px_rgba(255,255,255,0.35)]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
