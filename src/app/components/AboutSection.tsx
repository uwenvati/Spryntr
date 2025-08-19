"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FiCpu, FiEye, FiSettings, FiGlobe, FiZap } from "react-icons/fi";

const modules = [
  {
    icon: <FiCpu className="text-xl" />,
    title: "Organizational Intelligence",
    description:
      "One brain for your org—teams, tools, and data acting as a single system.",
  },
  {
    icon: <FiEye className="text-xl" />,
    title: "Real-Time Clarity",
    description:
      "Live views of every process and dataset. No lag. No blind spots.",
  },
  {
    icon: <FiSettings className="text-xl" />,
    title: "Workflow Automation",
    description:
      "No-code workflows across departments—reliable, repeatable, fast.",
  },
  {
    icon: <FiGlobe className="text-xl" />,
    title: "Holistic Visibility",
    description:
      "See people, assets, and outcomes in context with maps and digital twins.",
  },
  {
    icon: <FiZap className="text-xl" />,
    title: "Instant Response",
    description:
      "Embed alerts and logic so teams act immediately when priorities shift.",
  },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const rafRef = useRef<number | null>(null);

  // keep refs array length in sync with modules
  const cardCount = modules.length;
  cardRefs.current = useMemo(
    () =>
      Array(cardCount)
        .fill(null)
        .map((_, i) => cardRefs.current[i] ?? null),
    [cardCount]
  );

  // compute which card is closest to container center
  const updateActiveIndex = () => {
    const root = containerRef.current;
    if (!root) return;

    const rootRect = root.getBoundingClientRect();
    const rootCenterX = rootRect.left + rootRect.width / 2;

    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    for (let i = 0; i < cardRefs.current.length; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const cardCenterX = r.left + r.width / 2;
      const dist = Math.abs(cardCenterX - rootCenterX);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }
    setActiveIndex(bestIdx);
  };

  // rAF scroll handler
  const onScroll = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateActiveIndex);
  };

  // recompute on mount & resize
  useEffect(() => {
    updateActiveIndex();

    // Guard in case ResizeObserver is not available (older browsers)
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => updateActiveIndex());
      if (containerRef.current) ro.observe(containerRef.current);
    }

    const onWinResize = () => updateActiveIndex();
    window.addEventListener("resize", onWinResize);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", onWinResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    
  }, []);

  const scrollToIndex = (i: number) => {
    const el = cardRefs.current[i];
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section className="relative z-0 bg-[#FCFCFD] py-16 px-4 md:px-8 overflow-visible">
      {/* Heading + paragraph (right-aligned, same font as Hero, no animation) */}
      <div className="max-w-4xl ml-auto text-right mb-10">
       <h2 className="font-semibold leading-tight tracking-tight text-black text-4xl md:text-6xl lg:text-7xl">
  Smarter Solutions for <br />
  Faster & Clearer <br />
  Decisions
</h2>



        <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
          From scattered systems to slow decisions—solve it all with smarter, faster,
          data-powered solutions.
        </p>
      </div>

      {/* Tabs (active tab underlined; cards control active via scroll) */}
      <ul className="relative hidden md:flex justify-center gap-8 mb-6 whitespace-nowrap border-b border-gray-200">
        {modules.map((m, i) => {
          const isActive = activeIndex === i;
          return (
            <li
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-current={isActive ? "true" : undefined}
              className={`cursor-pointer pb-3 px-1 transition-colors ${
                isActive ? "text-black font-semibold" : "text-gray-700 hover:text-black"
              }`}
            >
              <span
                className={`inline-block pb-1 ${
                  isActive ? "border-b-2 border-black" : "border-b-2 border-transparent"
                }`}
              >
                {m.title}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Cards (no hover/motion effects; horizontal slide with snap) */}
      <div
        ref={containerRef}
        onScroll={onScroll}
        aria-label="About modules carousel"
        className="relative flex overflow-x-auto space-x-8 md:space-x-10 scroll-smooth snap-x snap-mandatory pb-6 no-scrollbar mx-auto overflow-y-hidden focus:outline-none"
      >
        {modules.map((m, i) => (
          <article
            key={i}
            data-index={i}
            ref={(el: HTMLDivElement | null) => {
              cardRefs.current[i] = el;
            }}
            className="about-card snap-center shrink-0 w-[88vw] md:w-[58vw] rounded-2xl p-6 md:p-8 bg-white border border-black/10 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center gap-3 mb-3">
              {m.icon}
              <h3
                className={`text-xl font-semibold ${
                  activeIndex === i ? "text-black" : "text-gray-900"
                }`}
              >
                {m.title}
              </h3>
            </div>
            <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed">
              {m.description}
            </p>
            <div className="mt-6">
            <Link
  href="/#top"
  className="inline-flex items-center gap-2 rounded-xl border border-black/15 bg-black text-white px-4 py-2 text-sm transition active:scale-95"
>
  Learn more
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
</Link>


            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
