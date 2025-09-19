import './globals.css'
//import Navbar from './components/Navbar'
import { Inter, Outfit } from 'next/font/google'
import { WaitlistModalProvider } from '@/context/WaitlistModalContext'
import WaitlistModal from './components/WaitlistModal'
import SeoSchema from './components/SeoSchema'
import type { Metadata, Viewport } from 'next'
import ConditionalNavbar from './components/ConditionalNavbar'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spryntr.co'
const siteName = 'Spryntr'
const siteTitle = 'Spryntr — Build your digital foundation'
const siteDescription =
  'Spryntr helps modern organizations turn messy data into action. Secure, fast, and effortless.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  icons: { icon: '/favicon.png' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Spryntr' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/og.png'],
  },
  alternates: { canonical: siteUrl },
  // ❌ themeColor moved out of here
}

// ✅ Put theme color (and optional viewport settings) here:
export const viewport: Viewport = {
  themeColor: '#000000',
  // Optional but recommended:
  width: 'device-width',
  initialScale: 1,
  // Or support light/dark automatically:
  // themeColor: [
  //   { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  //   { media: '(prefers-color-scheme: dark)', color: '#000000' },
  // ],
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-outfit',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-[#FCFCFD] text-black font-[var(--font-inter)]">
        <WaitlistModalProvider>
          {/* Only show navbar if not on studio route */}
          <ConditionalNavbar />
          {children}
          <WaitlistModal />
        </WaitlistModalProvider>
        <SeoSchema siteUrl={siteUrl} />
      </body>
    </html>
  )
}
