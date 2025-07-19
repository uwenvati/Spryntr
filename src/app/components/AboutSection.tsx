"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTapHover } from '@/hooks/useTapHover'

const modules = [
  {
    title: "Organizational Intelligence",
    description:
      "Spryntr transforms the way institutions think and operate by deploying a digital brain across the organization. This isn't just software—it's a mission control system embedded into your daily operations. Cortex, our unified intelligence platform, serves as the central nervous system that connects your teams, tools, data, and workflows into one cohesive, responsive engine. It’s designed to think with you, learn with you, and evolve as your organization grows in scale and complexity.",
  },
  {
    title: "Real-Time Clarity",
    description:
      "Modern organizations operate in volatile, data-heavy environments where delays or blind spots cost lives, opportunities, or resources. Spryntr provides real-time visibility into every system, dataset, and decision point. We eliminate the lag between observation and action by giving you a unified, live view of your entire ecosystem—so insights are never outdated, and decision-makers are never in the dark.",
  },
  {
    title: "Workflow Automation",
    description:
      "From mission-critical operations to routine approvals, Spryntr automates what slows you down. We enable teams to build powerful, no-code workflows that execute across departments, tools, and data layers—automatically. Whether you’re routing intelligence to a response unit, transforming datasets for analysis, or syncing information across platforms, Spryntr makes operations fluid, repeatable, and scalable.",
  },
  {
    title: "Holistic Visibility",
    description:
      "Siloed systems lead to fragmented decisions. Spryntr unifies your organization’s view—connecting the dots between infrastructure, people, assets, and outcomes. Using digital twin modeling and relationship mapping, we help you understand not just what’s happening, but how and why. This bird’s-eye perspective enables proactive planning, risk mitigation, and systems thinking at every level.",
  },
  {
    title: "Instant Response",
    description:
      "In high-compliance, high-stakes environments, delay is defeat. Spryntr is engineered for urgency. By embedding logic, alerts, and automation directly into your infrastructure, we empower teams to respond to opportunities, crises, or shifting priorities instantly. Whether you're managing a national emergency or reallocating resources in real time, Spryntr enables decisive action—when it matters most.",
  },
]

export default function AboutSection() {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setActiveIndex(index)
          }
        })
      },
      {
        root: containerRef.current,
        threshold: 0.6,
        rootMargin: "0px",
      }
    )

    const cards = document.querySelectorAll(".about-card")
    cards.forEach((card) => observer.observe(card))

    return () => cards.forEach((card) => observer.unobserve(card))
  }, [])

  const scrollToIndex = (index: number) => {
    const card = document.querySelector(`[data-index='${index}']`)
    card?.scrollIntoView({ behavior: "smooth", inline: "start" })
  }

  return (
    <section className="bg-[#FCFCFD] py-16 px-4 md:px-8">
      <div className="text-right max-w-3xl ml-auto mr-4 md:mr-10 mb-12">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          Finding solutions to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">
            data infrastructure in Africa
          </span>
        </h2>
        <p className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed">
          Spryntr is the digital backbone for modern organizations—unifying data,
          operations, and intelligence into one scalable platform.
        </p>
      </div>

      {/* Nav Tabs */}
      <ul className="hidden md:flex justify-center gap-6 mb-6 overflow-x-auto whitespace-nowrap border-b border-gray-200">
        {modules.map((mod, index) => (
          <li
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`cursor-pointer pb-2 px-1 border-b-2 transition duration-300 ${
              activeIndex === index
                ? "border-black font-semibold"
                : "border-transparent text-gray-500"
            }`}
          >
            {mod.title}
          </li>
        ))}
      </ul>

{/* Section Title for Active Module - MOBILE ONLY */}
<div className="md:hidden px-4 mb-4">
  <h3 className="text-lg font-semibold text-black border-b-2 border-black inline-block">
    {modules[activeIndex].title}
  </h3>
</div>


      {/* Scrollable Content */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto space-x-10 scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar mx-auto"
      >
       {modules.map((mod, index) => {
  const { hovered, bind } = useTapHover()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768 // fallback since no isMobile hook here

  return (
    <motion.div
      key={index}
      data-index={index}
      {...bind}
      className={`group about-card snap-start shrink-0 w-[90vw] md:w-[60vw] bg-white p-6 rounded-xl border border-gray-200 transition-all duration-300
        ${isMobile
          ? hovered ? 'scale-105 shadow-lg' : 'shadow'
          : 'hover:scale-105 hover:shadow-lg shadow'}
      `}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <button
        className={`mb-4 flex items-center gap-2 text-sm border px-4 py-2 rounded transition-all duration-300 ${
          isMobile
            ? hovered ? 'bg-black text-white border-black' : 'border-black'
            : 'group-hover:bg-black group-hover:text-white group-hover:border-black border-black'
        }`}
      >
        Learn more
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transform transition-transform duration-300 ${
            isMobile
              ? hovered ? 'translate-x-1 text-white' : ''
              : 'group-hover:translate-x-1 group-hover:text-white'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <h3 className="text-2xl font-semibold mb-2">{mod.title}</h3>
      <p className="text-gray-600 text-sm">{mod.description}</p>
    </motion.div>
  )
})}



      </div>

 

    </section>
  )
}
