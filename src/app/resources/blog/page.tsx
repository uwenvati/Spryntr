// app/resources/blog/page.tsx
import type { Metadata } from 'next'
import BlogIndexClient from './BlogIndexClient'

export const metadata: Metadata = {
  title: 'Spryntr Blog — Insights & Updates',
  description:
    'Read the latest insights, product updates, and thought leadership from the Spryntr team.',
  alternates: { canonical: 'https://spryntr.co/resources/blog' },
}

export default function BlogPage() {
  // Server component – no hooks here.
  return <BlogIndexClient />
}
