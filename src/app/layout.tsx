import './globals.css'
import Navbar from './components/Navbar'
import { Inter, Outfit } from 'next/font/google'
import { WaitlistModalProvider } from '@/context/WaitlistModalContext'
import WaitlistModal from './components/WaitlistModal'

export const metadata = {
  title: 'Spryntr',
  description: 'Built by Shammah',
  icons: { icon: '/favicon.png' },
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], weight: ['400','600','700','900'], variable: '--font-outfit' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-[#FCFCFD] text-black font-[var(--font-inter)]">
        <WaitlistModalProvider>
          <Navbar />
          {children}
          <WaitlistModal /> {/* render once near the root */}
        </WaitlistModalProvider>
      </body>
    </html>
  )
}
