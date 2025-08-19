'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Folder, Users, BookOpen, GitBranch, FileText } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

type MenuKey = 'About' | 'Products' | 'Resources' | null

const DISCORD_INVITE = 'https://discord.gg/mpEbkS4m'

const DROPDOWNS: Record<Exclude<MenuKey, null>, { name: string; href: string; icon?: 'folder' | 'users' | 'book' | 'git' | 'file' | 'cortex' }[]> = {
  About: [
    { name: 'Company', href: '/about/company', icon: 'folder' },
    { name: 'Team', href: '/about/team', icon: 'users' },
  ],
  Products: [
    { name: 'Cortex', href: '/product/cortex', icon: 'cortex' },
  ],
  Resources: [
    { name: 'Docs', href: '/resources/docs', icon: 'book' },
    { name: 'GitHub', href: 'https://github.com', icon: 'git' },
    // Use the same Discord invite as Get started
    { name: 'Discord', href: DISCORD_INVITE, icon: 'file' },
  ],
}

function Icon({ name }: { name?: 'folder' | 'users' | 'book' | 'git' | 'file' | 'cortex' }) {
  if (!name) return <span className="w-4 h-4" />
  if (name === 'cortex') return <Image src="/cortex-icon.svg" alt="Cortex" width={16} height={16} />
  const common = { size: 16, className: 'text-black' } as const
  switch (name) {
    case 'folder': return <Folder {...common} />
    case 'users': return <Users {...common} />
    case 'book': return <BookOpen {...common} />
    case 'git': return <GitBranch {...common} />
    case 'file': return <FileText {...common} />
  }
}

const ddVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.16, ease: 'easeOut' } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.12, ease: 'easeIn' } },
}

const accVariants: Variants = ddVariants

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openKey, setOpenKey] = useState<MenuKey>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openMobileKey, setOpenMobileKey] = useState<MenuKey>(null)

  // ✅ detect touch to change dropdown behavior
  const [isTouch, setIsTouch] = useState(false)
  // ✅ Touch detection without unused expressions or ts-ignore
useEffect(() => {
  const mq = window.matchMedia?.('(pointer: coarse)');
  setIsTouch(!!mq?.matches);

  if (!mq) return;

  const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);

  if ('addEventListener' in mq) {
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }

  // Older Safari fallback
  // @ts-expect-error: addListener exists on older MediaQueryList
  mq.addListener(handler);
  return () => {
    // @ts-expect-error: removeListener exists on older MediaQueryList
    mq.removeListener(handler);
  };
}, []);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpenKey(null), 150)
  }

  const desktopWrapper =
    `hidden md:flex fixed top-4 left-4 right-4 z-50 p-4 rounded-2xl ` +
    `${scrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-white/40 backdrop-blur-sm'} ` +
    `shadow border border-white/50 items-center justify-between font-sans transition duration-300`

  return (
    <>
      {/* DESKTOP NAV */}
      <nav className={desktopWrapper}>
        {/* Left: Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/assets/spryntr.svg" alt="Spryntr Logo" width={100} height={32} className="h-6 md:h-8 w-auto" />
        </Link>

        {/* Center: Dropdown links */}
        <ul className="flex items-center gap-8 text-sm relative">
          {(['About', 'Products', 'Resources'] as Exclude<MenuKey, null>[]).map((key) => (
            <li
              key={key}
              className="relative"
              onMouseEnter={!isTouch ? () => { cancelClose(); setOpenKey(key) } : undefined}
              onMouseLeave={!isTouch ? scheduleClose : undefined}
            >
              <button
                className="flex items-center gap-1 text-black"
                onFocus={!isTouch ? () => setOpenKey(key) : undefined}
                onBlur={!isTouch ? scheduleClose : undefined}
                onClick={isTouch ? () => setOpenKey(openKey === key ? null : key) : undefined}
                aria-expanded={openKey === key}
                aria-haspopup="menu"
              >
                {key} <ChevronDown size={14} className="text-black" />
              </button>

              <AnimatePresence>
                {openKey === key && (
                  <motion.div
                    key={`${key}-menu`}
                    variants={ddVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 px-3 z-50 pointer-events-auto"
                    onMouseEnter={!isTouch ? cancelClose : undefined}
                    onMouseLeave={!isTouch ? scheduleClose : undefined}
                  >
                    {DROPDOWNS[key].map(({ name, href, icon }) => (
                      <Link
                        key={name}
                        href={href}
                        className="flex items-center gap-2 px-2 py-2 text-sm text-black hover:bg-gray-100 rounded"
                        onClick={() => setOpenKey(null)}
                      >
                        <Icon name={icon} />
                        {name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}

          {/* Pricing */}
          <li>
            <Link href="/pricing" className="text-black">
              Pricing
            </Link>
          </li>
        </ul>

        {/* Right: Auth */}
        <div className="flex items-center gap-4 text-sm">
          {/* Removed "Sign in" per request */}
          <Link
            href={DISCORD_INVITE}
            className="bg-black text-white px-4 py-2 rounded-full flex items-center"
          >
            Get started
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <nav
        className={
          `md:hidden fixed top-4 left-4 right-4 z-50 p-4 rounded-2xl shadow ` +
          `${scrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-white/40 backdrop-blur-sm'} ` +
          `flex items-center justify-between font-sans transition duration-300 border border-white/50`
        }
      >
        <Image src="/assets/logo.svg" alt="Logo" width={24} height={24} />
        <button onClick={() => setMenuOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* MOBILE FULLSCREEN MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center text-2xl font-medium">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 z-20"
              onClick={() => { setMenuOpen(false); setOpenMobileKey(null) }}
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Pulsing network bg */}
            <Image
              src="/assets/network.svg"
              alt="Network Background"
              fill
              className="object-contain opacity-20 animate-pulse pointer-events-none"
            />

            {/* Menu content */}
            <div className="relative z-10 w-full max-w-md px-6">
              <ul className="space-y-4 text-black">
                {(['About', 'Products', 'Resources'] as Exclude<MenuKey, null>[]).map((key) => {
                  const isOpen = openMobileKey === key
                  return (
                    <li key={key} className="border-b border-gray-100 pb-3">
                      <button
                        className="mx-auto flex items-center gap-2 text-2xl"
                        onClick={() => setOpenMobileKey(isOpen ? null : key)}
                        aria-expanded={isOpen}
                      >
                        <span>{key}</span>
                        <ChevronDown
                          size={18}
                          className={`text-black transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key={`${key}-panel`}
                            variants={accVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="mt-3 space-y-3 pl-1"
                          >
                            {DROPDOWNS[key].map(({ name, href, icon }) => (
                              <Link
                                key={name}
                                href={href}
                                onClick={() => { setMenuOpen(false); setOpenMobileKey(null) }}
                                className="flex items-center gap-2 text-xl justify-center"
                              >
                                <Icon name={icon} />
                                {name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                })}

                {/* Pricing */}
                <li className="pt-2">
                  <Link
                    href="/pricing"
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl flex justify-center"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>

              {/* Auth buttons */}
              <div className="flex justify-center items-center gap-4 mt-8 text-sm">
                {/* Removed "Sign in" per request */}
                <Link
                  href={DISCORD_INVITE}
                  className="bg-black text-white px-4 py-2 rounded-full flex items-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Get started
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
