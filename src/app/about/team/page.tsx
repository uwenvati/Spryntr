
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Spryntr Team — Meet the Builders',
  description:
    'Get to know the Spryntr team of engineers and entrepreneurs working to connect messy data and unlock smarter decisions for organizations everywhere.',
  alternates: { canonical: 'https://spryntr.co/about/team' },
}


export default function TeamPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Meet the Team</h1>
      <p className="mt-4">Our awesome humans building the future.</p>
    </div>
  )
}
