
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Spryntr — Our Company',
  description:
    'Learn about Spryntr, our mission to help modern organizations structure and activate their data, and how we’re building AI-ready infrastructure for Africa and beyond.',
  alternates: { canonical: 'https://spryntr.co/about/company' },
}


export default function CompanyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#FCFCFD]">
      <h1 className="text-4xl font-bold text-black mb-4">
        About Our Company
      </h1>
      <p className="text-gray-600 text-center max-w-2xl">
        Welcome to the Company page. We’re building smarter solutions for faster
        and clearer decisions.
      </p>
    </main>
  );
}
