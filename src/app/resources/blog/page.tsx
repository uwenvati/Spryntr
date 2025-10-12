import type { Metadata } from 'next'
import { Suspense } from 'react'
import BlogIndexClient from './BlogIndexClient'

export const metadata: Metadata = {
  title: 'Spryntr Blog — Insights & Updates',
  description:
    'Read the latest insights, product updates, and thought leadership from the Spryntr team.',
  alternates: { canonical: 'https://spryntr.co/resources/blog' },
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-black rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    }>
      <BlogIndexClient />
    </Suspense>
  )
}