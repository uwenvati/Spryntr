// src/app/product/cortex/page.tsx
import type { Metadata } from 'next'
import Script from 'next/script'
import AboutCortex from '@/app/components/AboutCortex'
import AboutSection from '@/app/components/AboutSection'

// ❌ remove 'use client' here — this file must be a Server Component to export metadata

export const metadata: Metadata = {
  title: 'Spryntr Cortex — AI-Ready Data Platform',
  description:
    'Cortex by Spryntr is your foundation for connecting data sources, modeling entities, and activating insights with AI-ready infrastructure.',
  alternates: { canonical: 'https://spryntr.co/product/cortex' },
  openGraph: {
    // 'product' is NOT in Next's union — use 'website' (or omit type)
    type: 'website',
    title: 'Spryntr Cortex — AI-Ready Data Platform',
    description:
      'Connect, model, and activate your data with Spryntr Cortex, built for speed and AI integration.',
    url: 'https://spryntr.co/product/cortex',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spryntr Cortex — AI-Ready Data Platform',
    description:
      'Connect, model, and activate your data with Spryntr Cortex, built for speed and AI integration.',
    images: ['/og.png'],
  },
}

export default function CortexPage() {
  // ✅ You can still render client components below (AboutCortex/AboutSection can have 'use client')
  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Spryntr Cortex',
    url: 'https://spryntr.co/product/cortex',
    description: 'AI-ready data modeling and activation platform.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, // adjust later
  }

  return (
    <main className="flex flex-col">
      {/* JSON-LD for Product — this is how you express "product" to Google */}
      <Script
        id="ld-json-cortex"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />

      {/* Hero / Intro */}
      <section className="bg-white py-16 px-6 md:px-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Cortex</h1>
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
