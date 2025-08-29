'use client'
import Link from 'next/link'
import Image from 'next/image'
import { FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa'
import { useWaitlistModal } from '@/context/WaitlistModalContext' // ⬅️ NEW

export default function Footer() {
  const { open: openWaitlist } = useWaitlistModal() // ⬅️ modal trigger

  return (
    <footer className="bg-white pt-24">

      {/* CTA Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 bg-white rounded-2xl border border-[#D4D4D4] shadow-sm text-center flex flex-col items-center space-y-6">
        <h2 className="text-2xl md:text-4xl font-semibold text-black leading-tight">
          Start building <br /> your digital foundation.
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          {/* Get Started → Waitlist */}
          <button
            onClick={openWaitlist}
            className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-900 transition"
          >
            Get Started <span className="ml-2">→</span>
          </button>

          {/* Request Demo → Waitlist */}
          <button
            onClick={openWaitlist}
            className="bg-[#FCFCFD] border border-[#FAFAFA] text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition"
          >
            Request Demo <span className="ml-2">→</span>
          </button>
        </div>
      </div>

      {/* Footer Main */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 flex flex-col gap-10 md:flex-row md:justify-between md:items-start">

        {/* Logo */}
        <div className="mx-auto md:mx-0">
          <Link href="/#top">
            <Image
              src="/assets/spryntr.svg"
              alt="Spryntr Logo"
              width={120}
              height={32}
              className="h-6 w-auto"
            />
          </Link>
        </div>

        {/* Nav Links */}
        <div className="grid grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-semibold mb-2 text-sm">About</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li><Link href="/about/company">Company</Link></li>
              <li><Link href="/about/team">Team</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-sm">Products</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li><Link href="/product/cortex">Cortex</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-sm">Resources</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li><Link href="/resources/docs">Docs</Link></li>
              <li><Link href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</Link></li>
              <li><Link href="https://discord.gg/mpEbkS4m" target="_blank" rel="noopener noreferrer">Discord</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Icons + Newsletter */}
        <div className="flex flex-col items-center gap-6 md:items-end">
          <div className="flex gap-4">
            <Link href="#"><FaLinkedin className="h-5 w-5 text-gray-700 hover:text-black" /></Link>
            <Link href="#"><FaGithub className="h-5 w-5 text-gray-700 hover:text-black" /></Link>
            <Link href="https://discord.gg/mpEbkS4m" target="_blank" rel="noopener noreferrer">
              <FaDiscord className="h-5 w-5 text-gray-700 hover:text-black" />
            </Link>
          </div>
          <div className="flex w-full max-w-xs">
            <input
              type="email"
              placeholder="Stay in the connected"
              className="flex-1 border border-gray-300 rounded-l-full px-4 py-2 text-sm focus:outline-none"
            />
            <button className="bg-black text-white px-4 py-2 rounded-r-full text-sm hover:bg-gray-900 transition">
              Sign up
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center md:text-right max-w-xs">
            Building the digital backbone for modern organizations.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 py-4">
        <p className="text-center text-xs text-gray-500">© 2025 Spryntr. All rights reserved.</p>
      </div>
    </footer>
  )
}
