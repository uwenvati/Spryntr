import Link from 'next/link'
import Image from 'next/image'
import { FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-white pt-24">
      
     <div className="max-w-4xl mx-auto px-6 py-16 bg-white rounded-2xl border border-[#D4D4D4] shadow-sm text-center flex flex-col items-center space-y-6">
  <h2 className="text-2xl md:text-4xl font-bold text-black">
    Start building your digital foundation.
  </h2>
  <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
    <Link href="#" className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition">
      Request Early Access <span className="ml-2">→</span>
    </Link>
    <Link href="#" className="bg-[#FCFCFD] border border-[#FAFAFA] text-black px-6 py-3 rounded-full hover:bg-gray-100 transition">
      Read the Full Vision <span className="ml-2">→</span>
    </Link>
  </div>
</div>


      {/* Main Footer Nav */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between gap-12">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image src="/assets/spryntr.svg" alt="Spryntr Logo" width={120} height={32} className="h-6 w-auto" />
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-8">
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li><Link href="/about">Company</Link></li>
              <li><Link href="/team">Team</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Products</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li><Link href="/product">Cortex</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li><Link href="#">Docs</Link></li>
              <li><Link href="#">GitHub</Link></li>
              <li><Link href="#">Discord</Link></li>
            </ul>
          </div>
        </div>

        {/* Social + Newsletter */}
        <div className="flex-1 flex flex-col items-start md:items-end space-y-6">
          <div className="flex items-center space-x-4">
            <Link href="#"><FaLinkedin className="h-6 w-6 text-gray-700 hover:text-black" /></Link>
            <Link href="#"><FaGithub   className="h-6 w-6 text-gray-700 hover:text-black" /></Link>
            <Link href="#"><FaDiscord  className="h-6 w-6 text-gray-700 hover:text-black" /></Link>
          </div>
          <div className="flex w-full max-w-sm">
            <input
              type="email"
              placeholder="Stay in the connected"
              className="flex-1 border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none"
            />
            <button className="bg-black text-white px-4 py-2 rounded-r-full hover:bg-gray-900 transition">
              Sign up
            </button>
          </div>
          <p className="text-sm text-gray-500">Building the digital backbone for modern organizations.</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 py-4">
        <p className="text-center text-sm text-gray-500">© 2025 Spryntr. All rights reserved.</p>
      </div>
    </footer>
  )
}
