

export const metadata = {
  title: 'Spryntr',
  description: 'Built by Shammah ',
}


// src/app/layout.tsx
import './globals.css'
import Navbar from './components/Navbar'
import { Inter } from 'next/font/google'
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "600", "700", "900"] });

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-[#FCFCFD] text-black">

        <Navbar />
        {children}
      </body>
    </html>
  )
}






