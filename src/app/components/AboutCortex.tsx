"use client"

import { useEffect, useState } from "react"

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

function ScrollingModules() {
  const images = [
    "module1.png", "module2.png", "module3.png", "module4.png", "module5.png",
    "module6.png", "module7.png", "module8.png", "module9.png", "module10.png", "module11.png",
  ]

  const duplicated = [...images, ...images] // duplicate for smooth loop

  return (
    <div className="overflow-hidden mt-10 relative rounded-2xl">
      <div className="flex gap-4 whitespace-nowrap animate-scroll-loop hover:[animation-play-state:paused] w-max">
        {duplicated.map((src, index) => (
          <div
            key={`${src}-${index}`} // safe from duplicate key errors 
            className="flex-shrink-0 w-48 md:w-52 h-52 rounded-xl flex items-center justify-center p-4 transition-transform duration-300 hover:scale-105"
          >
            <img
              src={`/modules/${src}`}
              alt={`Module ${index + 1}`}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AboutCortex() {
  const isMobile = useIsMobile()

  return (
    <section className="pt-16 pb-0 space-y-10">
      {/* Cortex Panel */}
      <div className="bg-black text-white rounded-3xl mx-4 md:mx-16 px-6 md:px-12 py-16 overflow-visible space-y-10">
        {isMobile ? (
          <>
            <ScrollingModules />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white/90 to-white/40 text-transparent bg-clip-text leading-[1.2]">
              Introducing Cortex
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Cortex is Spryntr’s secure, scalable mission control—built to unify data,
              automate workflows, detect patterns, and drive human-machine collaboration.
              <br />
              Always on. Always learning. Always advancing your organization.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white/90 to-white/40 text-transparent bg-clip-text leading-[1.2]">
              Introducing Cortex
            </h2>
            <p className="text-white/70 text-base max-w-3xl leading-relaxed">
              Cortex is Spryntr’s secure, scalable mission control—built to unify data,
              automate workflows, detect patterns, and drive human-machine collaboration.
              <br />
              Always on. Always learning. Always advancing your organization.
            </p>
            <ScrollingModules />
          </>
        )}

        {/* Learn More Button */}
        <button className="mt-4 inline-flex items-center gap-2 border border-white px-6 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-white hover:text-black transition duration-300">
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* White Section */}
      <div className="bg-[#F6F6F6] px-6 md:px-20 py-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold">
          Post-Generative AI Needs Better Data.
        </h2>

        <p className="mt-6 text-base md:text-lg max-w-4xl text-gray-700 mx-auto">
          The future of AI isn’t about bigger models. It’s about smarter, context-specific
          data from inside organizations. Spryntr enables embedded AI agents that
          understand workflows, goals, and act intelligently.
        </p>

        {/* Quote Card */}
        <div className="bg-white mt-10 px-6 py-6 rounded-xl border border-gray-300 max-w-3xl mx-auto">
          <img
            src="/brain-icon.svg"
            alt="Brain Icon"
            className="w-6 h-6 mx-auto mb-2"
          />
          <p className="text-base text-gray-600 italic">
            &ldquo;Intelligence without context is just computation. Spryntr provides the context
            that transforms AI from a tool into a strategic advantage.&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
