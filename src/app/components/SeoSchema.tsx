'use client'
import Script from 'next/script'

type Props = {
  siteUrl: string
}

/**
 * Injects JSON-LD structured data:
 * - Organization (your company)
 * - WebSite (your site + built-in search action)
 *
 * keep it client-side so it renders once and stays simple.
 * Search engines read <script type="application/ld+json"> directly.
 */
export default function SeoSchema({ siteUrl }: Props) {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Spryntr',
    url: siteUrl,
    logo: `${siteUrl}/favicon.png`,
    sameAs: [
      // Add your real profiles when ready (or leave empty):
      // 'https://www.linkedin.com/company/your-handle',
      // 'https://github.com/your-handle',
      // 'https://twitter.com/your-handle',
      // 'https://discord.gg/mpEbkS4m',
    ],
  }

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Spryntr',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={query}`,
      'query-input': 'required name=query',
    },
  }

  return (
    <>
      <Script id="ld-json-org" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <Script id="ld-json-website" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }} />
    </>
  )
}
