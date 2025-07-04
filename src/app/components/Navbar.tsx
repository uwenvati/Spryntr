'use client'

import Link from 'next/link'

export default function Navbar() {
  const links = [
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/product' },
    { name: 'Resources', href: '#' },
  ]

  return (
    <nav className="relative z-10 mt-4 mb-0 mx-4 p-4 bg-[#FFFFFF] rounded-2xl shadow flex items-center justify-between font-sans">




      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/assets/spryntr.svg" alt="Spryntr Logo" className="h-6" />
        {/* <span className="font-bold text-lg">SPRYNTR</span> */}
      </div>

      {/* Nav links with down-arrow */}
      <ul className="flex items-center gap-8 text-sm">
        {links.map((link) => (
          <li key={link.name} className="flex items-center">
            <Link href={link.href} className="text-black">
              {link.name}
            </Link>
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
          </li>
        ))}

        {/* Pricing (no arrow) */}
        <li>
          <Link href="#" className="text-black">
            Pricing
          </Link>
        </li>
      </ul>

      {/* Auth buttons */}
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
  )
}

