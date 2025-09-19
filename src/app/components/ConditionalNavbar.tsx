'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  
  if (pathname?.startsWith('/studio')) {
    return null
  }
  
  return <Navbar />
}