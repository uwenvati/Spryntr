// src/app/resources/docs/page.tsx
import Link from 'next/link'

export default function DocsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#FCFCFD]">
      <h1 className="text-4xl font-bold text-black mb-4">Spryntr Docs</h1>
      <p className="text-gray-600 text-center max-w-2xl mb-6">
        Read guides, API references, and best practices for building with Spryntr.
      </p>

      <div className="flex gap-3">
        <Link
          href="/resources/docs/getting-started"
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full"
        >
          Getting Started
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        <Link
          href="#"
          className="inline-flex items-center gap-2 border border-black px-5 py-2.5 rounded-full text-black"
        >
          Browse All
        </Link>
      </div>
    </main>
  )
}
