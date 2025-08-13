"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiCpu, FiEye, FiSettings, FiGlobe, FiZap } from "react-icons/fi"; // original icons

const modules = [
  { 
    icon: <FiCpu className="text-xl" />, 
    title: "Organizational Intelligence", 
    description: "One brain for your org—teams, tools, and data acting as a single system." 
  },
  { 
    icon: <FiEye className="text-xl" />, 
    title: "Real-Time Clarity", 
    description: "Live views of every process and dataset. No lag. No blind spots." 
  },
  { 
    icon: <FiSettings className="text-xl" />, 
    title: "Workflow Automation", 
    description: "No-code workflows across departments—reliable, repeatable, fast." 
  },
  { 
    icon: <FiGlobe className="text-xl" />, 
    title: "Holistic Visibility", 
    description: "See people, assets, and outcomes in context with maps and digital twins." 
  },
  { 
    icon: <FiZap className="text-xl" />, 
    title: "Instant Response", 
    description: "Embed alerts and logic so teams act immediately when priorities shift." 
  },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const headingText = "Smarter Solutions for Faster & Clearer Decisions";

  // Trigger animation when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTyped) {
          setHasTyped(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasTyped]);

  // Typewriter effect once triggered
  useEffect(() => {
    if (!hasTyped) return;
    let i = 0;
    const timer = setInterval(() => {
      setTypedText(headingText.slice(0, i + 1));
      i++;
      if (i === headingText.length) clearInterval(timer);
    }, 100); // typing speed

    return () => clearInterval(timer);
  }, [hasTyped]);

  // Track active tab
  // make sure you have: const containerRef = useRef<HTMLDivElement | null>(null)

useEffect(() => {
  const root = containerRef.current;           // ✅ cache the ref once
  if (!root) return;

  const cards = Array.from(root.querySelectorAll('.about-card')); // ✅ cache observed nodes

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Number(e.target.getAttribute('data-index'));
          setActiveIndex(idx);
        }
      });
    },
    { root, threshold: 0.6 }
  );

  cards.forEach((el) => io.observe(el));

  return () => {
    // ✅ use cached references, not containerRef.current
    cards.forEach((el) => io.unobserve(el));
    io.disconnect();
  };
}, []); // keep deps empty since we're caching references


  const scrollToIndex = (i: number) => {
    containerRef.current
      ?.querySelector(`[data-index='${i}']`)
      ?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-0 bg-[#FCFCFD] py-16 px-4 md:px-8 overflow-visible"
      style={{ isolation: "isolate" }}
    >
      {/* Heading + paragraph */}
      <motion.div
        className="text-center max-w-4xl mx-auto mb-10"
        initial={{ opacity: 0, y: 50 }}
        animate={hasTyped ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2
          className="text-3xl md:text-5xl font-bold leading-tight tracking-tight"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          {typedText}
        </h2>
        <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
          From scattered systems to slow decisions—solve it all with smarter, faster, data-powered solutions.
        </p>
      </motion.div>

      {/* Tabs */}
      <ul className="relative hidden md:flex justify-center gap-8 mb-6 whitespace-nowrap border-b border-gray-200 z-[1]">
        {modules.map((m, i) => (
          <li
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`relative cursor-pointer pb-3 px-1 transition-colors ${
              activeIndex === i ? "text-black font-semibold" : "text-gray-500"
            }`}
          >
            {m.title}
            {activeIndex === i && (
              <motion.div
                layoutId="about-underline"
                className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-black shadow-[0_0_8px_rgba(0,0,0,0.6)]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </li>
        ))}
      </ul>

      {/* Cards */}
      <div
        ref={containerRef}
        className="relative z-[10] flex overflow-x-auto space-x-8 md:space-x-10 scroll-smooth snap-x snap-mandatory pb-6 no-scrollbar mx-auto overflow-y-hidden"
      >
        {modules.map((m, i) => (
          <motion.article
            key={i}
            data-index={i}
            className="about-card snap-start shrink-0 w-[88vw] md:w-[58vw]
              relative z-[20] rounded-2xl p-6 md:p-8
              bg-white/70 backdrop-blur-xl
              border border-black/10
              shadow-[0_12px_32px_-16px_rgba(0,0,0,0.35)]
              transition-all duration-300
              hover:rotate-[1.5deg] hover:scale-105 hover:shadow-[0_22px_50px_-18px_rgba(0,0,0,0.45)]
              group"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <div className="relative z-[1] flex items-center gap-3 mb-3">
              {m.icon}
              <h3 className="text-xl font-semibold">{m.title}</h3>
            </div>
            <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed">
              {m.description}
            </p>
            <div className="mt-6">
              <Link
                href="/cortex"
                className="group/btn inline-flex items-center gap-2 rounded-xl border border-black/15 bg-black text-white px-4 py-2 text-sm transition
                shadow-[0_6px_18px_-6px_rgba(0,0,0,0.35)]
                hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)] active:scale-95"
              >
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
