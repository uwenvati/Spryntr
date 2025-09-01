import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spryntr.vercel.app'

// live routes to include in sitemap
const routes = [
  '/', 
  '/about/company',
  '/about/team',
  '/product/cortex',
  '/resources/docs',
  '/resources/blog',
  '/pricing',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }))
}
