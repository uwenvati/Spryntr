'use client'
import Link from 'next/link'
import { useTapHover } from '@/hooks/useTapHover'

export default function Hero() {
  const { hovered, bind } = useTapHover()

  return (
    <section className="mt-24 md:mt-0 flex flex-col-reverse md:flex-row items-center justify-between w-full bg-[#FCFCFD] pb-16 overflow-hidden relative z-10 animate-fade-in">
      {/* Left side */}
      <div className="w-full md:w-[60%] px-6 md:px-16 space-y-6 relative">
        <img src="/assets/images/hero-top.svg" alt="Top Graphic" className="absolute top-0 right-0 w-40 md:hidden animate-float pointer-events-none" />

        <h1 className="mt-0 text-5xl md:text-6xl font-extrabold leading-[1.1] z-10 relative">
          <span className="sheen-wrap">
            <span className="sheen-text">Make decisions powered by smarter data</span>
            <span aria-hidden="true" className="sheen-overlay">Make decisions powered by smarter data</span>
          </span>
        </h1>

        <p className="text-gray-600 text-base md:text-lg leading-[1.6] max-w-xl z-10 relative">
          Stop guessing. Turn messy data into clear insight—and move smarter, faster.
          Get started today and watch your data work for you.
        </p>

        {/* CTA */}
        <div className="flex md:block justify-start">
          <Link
            href="/cortex"
            className="
              group relative inline-flex items-center gap-2 rounded-xl
              bg-black text-white px-6 py-3 text-sm
              transition
              shadow-[0_6px_18px_-6px_rgba(0,0,0,0.4)]
              hover:shadow-[0_10px_28px_-10px_rgba(0,0,0,0.55)]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30
              active:scale-95
            "
          >
            {/* shimmer sweep */}
            <span
              className="
                pointer-events-none absolute inset-0 overflow-hidden rounded-xl
              "
              aria-hidden
            >
              <span
                className="
                  absolute inset-y-0 -left-1/3 w-1/3 opacity-0
                  group-hover:opacity-25
                  skew-x-12
                  transition-opacity duration-200
                  will-change-transform
                "
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                  animation: 'spr-shimmer 1.15s linear infinite',
                }}
              />
            </span>

            <span className="relative z-[1]">See Cortex in Action</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-[1] h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <img src="/assets/images/hero-bottom.svg" alt="Bottom Graphic" className="absolute bottom-4 left-4 w-36 md:hidden animate-float pointer-events-none" />
      </div>

      {/* Right side */}
      <div className="hidden md:flex w-full md:w-1/2 justify-end pr-0 relative">
        <span className="hero-shadow" />
        <img
          {...bind}
          src="/assets/images/hero-img.svg"
          alt="Hero Visual"
          className={`w-full max-w-[480px] h-auto object-contain animate-float transition-transform duration-300 ${
            hovered ? 'scale-105' : 'hover:scale-105'
          }`}
        />
      </div>
    </section>
  )
}
