import Navbar from '@/app/components/Navbar'
import HeroCortex from './HeroCortex'
import SectorImpact from './SectorImpact'

export default function CortexPage() {
  return (
    <>
      <Navbar variant="dark" />
      <main className="bg-black text-white min-h-screen">
        <HeroCortex />
        <SectorImpact  /> {/* or variant="link" when you have real pages */}
        {/* …other sections */}
      </main>
    </>
  )
}
