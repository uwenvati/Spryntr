// app/sitemap.ts
import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spryntr.co'

// ✅ Update routes to match your actual site
const routes = [
  '/', 
  '/about/company',
  '/about/team',
  '/product/cortex',
  '/resources/docs',
  '/resources/blog',
  '/join-waitlist',
]


export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }))
}
