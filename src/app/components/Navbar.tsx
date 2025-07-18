'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/product' },
    { name: 'Resources', href: '#' },
    { name: 'Pricing', href: '#' }
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`hidden md:flex fixed top-4 left-4 right-4 z-50 p-4 rounded-2xl shadow transition duration-300 items-center justify-between font-sans ${
          scrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-white/40 backdrop-blur-sm'
        }`}
      >
        {/* Left: Logo */}
        <div className="flex items-center">
         <img src="/assets/spryntr.svg" alt="Spryntr Logo" className="h-6 md:h-8" />

        </div>

        {/* Center: Nav Links */}
        <ul className="flex items-center gap-8 text-sm">
          {links.map((link) => (
            <li key={link.name} className="flex items-center">
              <Link href={link.href} className="text-black">
                {link.name}
              </Link>
              {(link.name === 'About' || link.name === 'Products') && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </li>
          ))}
        </ul>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-4 text-sm">
          <Link href="#" className="text-black">
            Sign in
          </Link>
          <button className="bg-black text-white px-4 py-2 rounded-full flex items-center">
            Get started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav
        className={`md:hidden fixed top-4 left-4 right-4 z-50 p-4 rounded-2xl shadow transition duration-300 flex items-center justify-between font-sans ${
          scrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-white/40 backdrop-blur-sm'
        }`}
      >
        <Image src="/assets/logo.svg" alt="Logo" width={24} height={24} />

        <button onClick={() => setMenuOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Fullscreen Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center text-2xl font-medium space-y-8">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6"
            onClick={() => setMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

         {/* Network SVG (centered pulsing bg) */}
<img
  src="/assets/network.svg"
  alt="Network Background"
  className="absolute inset-0 m-auto h-full w-full object-contain opacity-20 animate-pulse pointer-events-none"
/>


          {/* Menu Links */}
          <ul className="z-10 space-y-6 text-black text-3xl">
          {/* Auth buttons - Mobile */}
<div className="flex justify-center items-center gap-4 mt-6 text-sm">
  <Link href="#" className="text-black flex items-center h-full">
    Sign in
  </Link>
  <button className="bg-black text-white px-4 py-2 rounded-full flex items-center">
    Get started
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 ml-2 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
</div>


            {links.map((link) => (
              <li key={link.name}>
                <Link href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
