'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Folder, Users, BookOpen, GitBranch, FileText } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useWaitlistModal } from '@/context/WaitlistModalContext'

type MenuKey = 'About' | 'Products' | 'Resources' | null
type Variant = 'light' | 'dark'

const DISCORD_INVITE = 'https://discord.gg/mpEbkS4m'

const DROPDOWNS: Record<
  Exclude<MenuKey, null>,
  { name: string; href: string; icon?: 'folder' | 'users' | 'book' | 'git' | 'file' | 'cortex' }[]
> = {
  About: [
    { name: 'Company', href: '/about/company', icon: 'folder' },
    { name: 'Team', href: '/about/team', icon: 'users' },
  ],
  Products: [{ name: 'Cortex', href: '/product/cortex', icon: 'cortex' }],
  Resources: [
    { name: 'Docs', href: '/resources/docs', icon: 'book' },
    { name: 'Blog', href: '/resources/blog', icon: 'file' },
    { name: 'GitHub', href: 'https://github.com', icon: 'git' },
    { name: 'Discord', href: DISCORD_INVITE, icon: 'file' },
  ],
}

function Icon({
  name,
  isDark,
}: { name?: 'folder' | 'users' | 'book' | 'git' | 'file' | 'cortex'; isDark: boolean }) {
  if (!name) return <span className="w-4 h-4" />
  if (name === 'cortex') return <Image src="/cortex-icon.svg" alt="Cortex" width={16} height={16} />
  const common = { size: 16, className: isDark ? 'text-white' : 'text-black' } as const
  switch (name) {
    case 'folder': return <Folder {...common} />
    case 'users':  return <Users {...common} />
    case 'book':   return <BookOpen {...common} />
    case 'git':    return <GitBranch {...common} />
    case 'file':   return <FileText {...common} />
  }
}

const ddVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.16, ease: 'easeOut' } },
  exit:    { opacity: 0, y: 8, transition: { duration: 0.12, ease: 'easeIn' } },
}
const accVariants: Variants = ddVariants

interface NavbarProps {
  variant?: Variant
}

export default function Navbar({ variant = 'light' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [openKey, setOpenKey] = useState<MenuKey>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openMobileKey, setOpenMobileKey] = useState<MenuKey>(null)
  const { open: openWaitlist } = useWaitlistModal()

// detect touch
const [isTouch, setIsTouch] = useState(false)
useEffect(() => {
  const mq = window.matchMedia?.('(pointer: coarse)')
  setIsTouch(!!mq?.matches)
  if (!mq) return
  const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches)
  
  // Fix line 76 - use if/else instead of ternary expression
  if (mq.addEventListener) {
    mq.addEventListener('change', handler)
  } else {
    mq.addListener(handler)
  }
  
  return () => {
    // Fix line 79 - use if/else instead of ternary expression
    if (mq.removeEventListener) {
      mq.removeEventListener('change', handler)
    } else {
      mq.removeListener(handler)
    }
  }
}, [])

// scroll → glossy toggle
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 10)
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}, [])

  const cancelClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current) }
  const scheduleClose = () => { cancelClose(); closeTimer.current = setTimeout(() => setOpenKey(null), 150) }

  const isDark = variant === 'dark'

  // Glass states
  const barGlass = scrolled
    ? isDark
      ? 'bg-black/50 backdrop-blur-md border border-white/10'
      : 'bg-white/70 backdrop-blur-md border border-black/10'
    : 'bg-transparent border border-transparent'

  const linkColor = isDark ? 'text-white' : 'text-black'
  const hoverItem = isDark
    ? 'hover:bg-white/5 text-white/90 hover:text-white'
    : 'hover:bg-black/5 text-black/90 hover:text-black'
  const panelBg = isDark
    ? 'bg-black/70 backdrop-blur-md border border-white/10'
    : 'bg-white/90 backdrop-blur-md border border-black/10'

  return (
    <>
      {/* DESKTOP NAV */}
      <nav
        className={`hidden md:flex fixed top-4 left-4 right-4 z-50 p-4 rounded-2xl shadow ${barGlass} items-center justify-between font-sans transition duration-300`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={isDark ? '/assets/spryntr-white.svg' : '/assets/spryntr.svg'}
            alt="Spryntr Logo"
            width={100}
            height={32}
            className="h-6 md:h-8 w-auto"
          />
        </Link>

        {/* Dropdowns */}
        <ul className="flex items-center gap-8 text-sm relative">
          {(['About', 'Products', 'Resources'] as Exclude<MenuKey, null>[]).map((key) => (
            <li
              key={key}
              className="relative"
              onMouseEnter={!isTouch ? () => { cancelClose(); setOpenKey(key) } : undefined}
              onMouseLeave={!isTouch ? scheduleClose : undefined}
            >
              <button
                className={`flex items-center gap-1 ${linkColor}`}
                onFocus={!isTouch ? () => setOpenKey(key) : undefined}
                onBlur={!isTouch ? scheduleClose : undefined}
                onClick={isTouch ? () => setOpenKey(openKey === key ? null : key) : undefined}
              >
                {key} <ChevronDown size={14} className={linkColor} />
              </button>

              <AnimatePresence>
                {openKey === key && (
                  <motion.div
                    key={`${key}-menu`}
                    variants={ddVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={`absolute top-full left-0 mt-2 w-56 rounded-xl shadow-lg py-2 px-3 z-50 pointer-events-auto ${panelBg}`}
                    onMouseEnter={!isTouch ? cancelClose : undefined}
                    onMouseLeave={!isTouch ? scheduleClose : undefined}
                  >
                    {DROPDOWNS[key].map(({ name, href, icon }) => (
                      <Link
                        key={name}
                        href={href}
                        className={`flex items-center gap-2 px-2 py-2 text-sm rounded ${hoverItem}`}
                        onClick={() => setOpenKey(null)}
                      >
                        <Icon name={icon} isDark={isDark} />
                        {name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={openWaitlist}
            className={`${isDark ? 'bg-white text-black' : 'bg-black text-white'} px-4 py-2 rounded-full flex items-center`}
          >
            Join waitlist
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-2 ${isDark ? 'text-black' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <nav
        className={`md:hidden fixed top-4 left-4 right-4 z-50 p-4 rounded-2xl shadow ${barGlass} flex items-center justify-between font-sans transition duration-300`}
      >
        <Image
          src={isDark ? '/assets/spryntr-white.svg' : '/assets/spryntr.svg'}
          alt="Logo"
          width={24}
          height={24}
        />
        <button onClick={() => setMenuOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${linkColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* MOBILE FULLSCREEN MENU */}
      {menuOpen && (
        <div className={`fixed inset-0 z-50 ${isDark ? 'bg-black' : 'bg-white'} flex flex-col items-center justify-center text-2xl font-medium`}>
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <button
              className="absolute top-6 right-6 z-20"
              onClick={() => { setMenuOpen(false); setOpenMobileKey(null) }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${linkColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <Image src="/assets/network.svg" alt="Network Background" fill className={`${isDark ? 'opacity-10' : 'opacity-20'} object-contain animate-pulse pointer-events-none`} />

            <div className="relative z-10 w-full max-w-md px-6">
              <ul className={`${linkColor} space-y-4`}>
                {(['About', 'Products', 'Resources'] as Exclude<MenuKey, null>[]).map((key) => {
                  const isOpen = openMobileKey === key
                  return (
                    <li key={key} className={`${isDark ? 'border-white/10' : 'border-black/10'} border-b pb-3`}>
                      <button
                        className="mx-auto flex items-center gap-2 text-2xl"
                        onClick={() => setOpenMobileKey(isOpen ? null : key)}
                      >
                        <span>{key}</span>
                        <ChevronDown size={18} className={`${linkColor} transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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
                                <Icon name={icon} isDark={isDark} />
                                {name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                })}
              </ul>

              <div className="flex justify-center items-center gap-4 mt-8 text-sm">
                <button
                  onClick={() => { openWaitlist(); setMenuOpen(false) }}
                  className={`${isDark ? 'bg-white text-black' : 'bg-black text-white'} px-4 py-2 rounded-full flex items-center`}
                >
                  Join waitlist
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-2 ${isDark ? 'text-black' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
