// src/app/product/cortex/page.tsx
'use client'

import AboutCortex from '@/app/components/AboutCortex'
import AboutSection from '@/app/components/AboutSection'

export default function CortexPage() {
  return (
    <main className="flex flex-col">
      {/* Hero / Intro */}
      <section className="bg-white py-16 px-6 md:px-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Cortex
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Explore the power of Cortex — smarter solutions for faster, clearer decisions.
        </p>
      </section>

      {/* Main content sections */}
      <AboutCortex />
      <AboutSection />
    </main>
  )
}
