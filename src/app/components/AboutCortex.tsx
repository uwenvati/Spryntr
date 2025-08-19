'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

function useInView(ref: React.RefObject<HTMLElement | null>, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), { rootMargin })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, rootMargin])
  return isIntersecting
}

type Mod = { img: string; label: string; hash: string }

const modules: Mod[] = [
  { img: 'module1.png', label: 'Module 1', hash: 'module1' },
  { img: 'module2.png', label: 'Module 2', hash: 'module2' },
  { img: 'module3.png', label: 'Module 3', hash: 'module3' },
  { img: 'module4.png', label: 'Module 4', hash: 'module4' },
  { img: 'module5.png', label: 'Module 5', hash: 'module5' },
  { img: 'module6.png', label: 'Module 6', hash: 'module6' },
  { img: 'module7.png', label: 'Module 7', hash: 'module7' },
  { img: 'module8.png', label: 'Module 8', hash: 'module8' },
  { img: 'module9.png', label: 'Module 9', hash: 'module9' },
  { img: 'module10.png', label: 'Module 10', hash: 'module10' },
  { img: 'module11.png', label: 'Module 11', hash: 'module11' },
]

function ScrollingModules() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const inView = useInView(containerRef, '-50px')
  const [paused, setPaused] = useState(false)

  const items = [...modules, ...modules]

  return (
    <div ref={containerRef} className="overflow-hidden mt-6 md:mt-10 relative rounded-2xl">
      <div
        className={`flex gap-3 md:gap-4 whitespace-nowrap w-max ${inView ? 'animate-scroll-loop' : ''}`}
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        {items.map((m, i) => {
          const preload = i < 4
          return (
            <Link
              key={`${m.img}-${i}`}
              href={{ pathname: '/product/cortex', hash: m.hash }}
              className="group flex-shrink-0 w-40 h-40 md:w-52 md:h-52 rounded-lg md:rounded-xl
                         flex items-center justify-center p-3 md:p-4 transition-transform duration-200 hover:scale-[1.03]"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              onTouchEnd={() => setTimeout(() => setPaused(false), 250)}
              aria-label={m.label}
              title={m.label}
            >
              <Image
                src={`/modules/${m.img}`}
                alt={m.label}
                width={208}
                height={208}
                className="h-full w-full object-contain"
                priority={preload}
                loading={preload ? 'eager' : 'lazy'}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function AboutCortex() {
  const isMobile = useIsMobile()

  return (
    <section className="pt-10 md:pt-16 pb-0 space-y-6 md:space-y-10">
      {/* Cortex Panel */}
      <div className="bg-black text-white rounded-2xl md:rounded-3xl mx-4 md:mx-16 px-4 md:px-12 py-10 md:py-16 overflow-visible space-y-6 md:space-y-10 text-center">
        {isMobile ? (
          <>
            <ScrollingModules />
            <h2 className="text-2xl sm:text-3xl font-semibold relative inline-block sheen-text">
              Introducing Cortex
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mt-2">
              Cortex is Spryntr’s secure, scalable mission control—built to unify data,
              automate workflows, detect patterns, and drive human–machine collaboration.
              <br className="hidden md:block" />
              Always on. Always learning. Always advancing your organization.
            </p>
            <Link
              href="/product/cortex"
              className="mt-3 inline-flex items-center gap-2 border border-white px-5 py-2 rounded-lg text-sm font-medium text-white hover:bg-white hover:text-black transition"
            >
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-4xl md:text-6xl font-semibold relative inline-block sheen-text">
              Introducing Cortex
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-3xl leading-relaxed mx-auto mt-3">
              Your mission control for unifying data, automating workflows, and driving seamless human–machine collaboration—secure, scalable, and built to evolve.
            </p>
            <ScrollingModules />
            <Link
              href="/product/cortex"
              className="mt-4 inline-flex items-center gap-2 border border-white px-6 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-white hover:text-black transition"
            >
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </>
        )}
      </div>
    </section>
  )
}
