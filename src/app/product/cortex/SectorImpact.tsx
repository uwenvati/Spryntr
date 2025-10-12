'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'

interface SectorData {
  id: string
  name: string
  title: string
  description: string
}

const sectors: SectorData[] = [
  {
    id: 'governance',
    name: 'Governance',
    title: 'Smart Governance & Policy',
    description:
      'Cortex enables governments to unify fragmented data systems and build a responsive, transparent governance model. From real-time resource allocation to policy simulations, officials gain insights to improve decision-making, reduce inefficiencies, and foster accountability across agencies and citizen services.'
  },
  {
    id: 'defense',
    name: 'Defense & Security',
    title: 'Defense & Security',
    description:
      'In an era of dynamic threats and complex missions, Cortex empowers defense and security agencies with a unified intelligence environment that integrates sensor data, logistics, communications, and field operations in real time. Through digital twin modeling and secure, role-based access, command units can simulate operations, detect anomalies, and respond proactively to emerging risks. Whether monitoring UAV telemetry, coordinating multi-agency responses, or managing classified intelligence pipelines, Cortex ensures operational clarity, mission readiness, and actionable insight across all tiers of national security infrastructure.'
  },
  {
    id: 'supply',
    name: 'Supply Chain & Logistics',
    title: 'Supply Chain & Logistics',
    description:
      'Cortex transforms logistics with predictive analytics, demand forecasting, and adaptive routing. Enterprises and governments can anticipate disruptions, optimize fleet and warehouse operations, and ensure resilient supply chains even in uncertain global markets. By breaking down silos between stakeholders, Cortex accelerates delivery, cuts costs, and reduces bottlenecks.'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    title: 'Healthcare & Life Sciences',
    description:
      'Cortex integrates clinical data, patient records, and population health insights into a single secure environment. Providers can detect early warning signals, optimize hospital resources, and improve patient outcomes with AI-driven diagnostics and treatment simulations. Public health agencies gain the ability to predict outbreaks, monitor real-time health trends, and coordinate cross-agency responses effectively.'
  },
  {
    id: 'finance',
    name: 'Finance & Risk',
    title: 'Finance & Risk Intelligence',
    description:
      'Cortex equips financial institutions and regulators with tools for fraud detection, market analysis, and systemic risk monitoring. By connecting transactional data with macroeconomic indicators, Cortex identifies hidden patterns, mitigates financial crime, and strengthens resilience against shocks. Decision-makers gain actionable insight for compliance, capital allocation, and long-term stability.'
  }
]

export default function SectorImpact() {
  const [activeSector, setActiveSector] = useState(sectors[0])

  // Auto-rotate every 8s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSector(prev => {
        const currentIndex = sectors.findIndex(s => s.id === prev.id)
        return sectors[(currentIndex + 1) % sectors.length]
      })
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-black text-white py-20 px-6 md:px-20 flex flex-col md:flex-row gap-12">
      {/* Left vertical nav */}
      <div className="flex flex-col gap-6 text-gray-500 relative">
        {sectors.map(sector => (
          <button
            key={sector.id}
            onClick={() => setActiveSector(sector)}
            className={`text-left transition-all duration-300 ${
              activeSector.id === sector.id
                ? 'text-white font-medium relative'
                : 'hover:text-gray-300'
            }`}
          >
            {activeSector.id === sector.id && (
              <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1.5 h-8 rounded bg-white shadow-lg" />
            )}
            {sector.name}
          </button>
        ))}
      </div>

      {/* Right content */}
      <div className="max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          {activeSector.title}
        </h2>
        <p className="text-gray-300 leading-relaxed mb-8">
          {activeSector.description}
        </p>
        <button className="flex items-center gap-2 border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition">
          Learn more <ArrowUpRight size={18} />
        </button>
      </div>
    </section>
  )
}
