"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Image from "next/image";

type Sector = {
  title: string;
  description: string;
  img: string;
};

const sectors: Sector[] = [
  { title: "Government & Public Sector", description: "From national security to public service delivery, decisions need to be made fast—and with precision. Real-time clarity and holistic visibility ensure agencies respond proactively, allocate resources effectively, and uphold accountability at every level.", img: "/assets/images/sectors/government.jpg" },
  { title: "Healthcare & Life Sciences", description: "In a field where every second and every datapoint matters, decision integrity is critical. Data unification and workflow automation streamline patient management, research, and diagnostics—improving outcomes while reducing operational drag.", img: "/assets/images/sectors/healthcare.jpg" },
  { title: "Logistics & Supply Chain", description: "Siloed data and fragmented systems lead to delays and waste. Organizational intelligence and automation enable end-to-end visibility across inventory, transportation, and demand—ensuring efficiency, traceability, and real-time adaptability.", img: "/assets/images/sectors/logistics.jpg" },
  { title: "Energy & Utilities", description: "Managing infrastructure at scale requires precision and foresight. With real-time insights and digital twins, stakeholders can predict failures, optimize load distribution, and proactively manage risk across complex operational landscapes.", img: "/assets/images/sectors/energy.jpg" },
  { title: "Finance & Enterprise Ops", description: "In high-stakes, data-dense environments, even small missteps can be costly. Decision integrity and unified systems ensure compliance, reduce fraud, and streamline analysis—turning complexity into a strategic advantage.", img: "/assets/images/sectors/finance.jpg" },
];

export default function AboutSectors() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const rafRef = useRef<number | null>(null);

  // align refs with sectors length
  cardRefs.current = useMemo(
    () => Array(sectors.length).fill(null).map((_, i) => cardRefs.current[i] ?? null),
    []
  );

  const updateActive = () => {
    const root = containerRef.current;
    if (!root) return;
    const cx = root.getBoundingClientRect().left + root.clientWidth / 2;
    let best = 0, dist = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mx = r.left + r.width / 2;
      const d = Math.abs(mx - cx);
      if (d < dist) { dist = d; best = i; }
    });
    setActive(best);
  };

  const onScroll = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateActive);
  };

  useEffect(() => {
    updateActive();
    const onResize = () => updateActive();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollTo = (i: number) => {
    cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };
  const goPrev = () => scrollTo(Math.max(0, active - 1));
  const goNext = () => scrollTo(Math.min(sectors.length - 1, active + 1));

  return (
    <section className="bg-[#FCFCFD] py-14 px-0 md:px-8 overflow-x-hidden">
      {/* Main section heading */}
      <div className="max-w-5xl mx-auto text-center mb-4 md:mb-8 px-4">
        <h2 className="text-3xl md:text-6xl font-extrabold leading-tight tracking-tight text-black">
          Built for Complexity Across Sectors
        </h2>
        <p className="hidden md:block mt-5 text-gray-700 max-w-3xl mx-auto md:text-lg leading-relaxed">
          <span className="font-semibold text-gray-900">Data challenges are everywhere.</span>{" "}
          From safety to strategy, every sector needs faster insights and smarter decisions.
          These solutions are built to handle complexity—bringing clarity, control, and confidence where it matters most.
        </p>
      </div>

      {/* Single active sector title with shimmer */}
      <div className="text-center mb-4 md:mb-6 px-4">
        <div className="inline-block relative">
          <span className="text-base md:text-2xl font-extrabold text-black">
            {sectors[active].title}
          </span>
          <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="absolute inset-y-0 left-0 w-1/3 opacity-40 skew-x-12 spr-heading-shimmer" />
          </span>
        </div>
      </div>

      {/* Carousel + arrows */}
      <div className="relative max-w-6xl mx-auto">
        {/* Arrows (hidden on mobile) */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous sector"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm hover:bg-gray-50 active:scale-95"
        >
          ←
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next sector"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm hover:bg-gray-50 active:scale-95"
        >
          →
        </button>

        {/* Slides */}
        <div
          ref={containerRef}
          onScroll={onScroll}
          className="relative mx-0 md:mx-12 flex overflow-x-auto space-x-3 md:space-x-6 scroll-smooth snap-x snap-mandatory no-scrollbar scroll-px-4 md:scroll-px-12
                     overscroll-x-contain touch-pan-y"
          aria-label="Sectors carousel"
        >
          {sectors.map((s, i) => (
            <div
              key={s.title}
              ref={(el: HTMLDivElement | null) => { cardRefs.current[i] = el }}
              className="snap-center shrink-0 w-[86vw] sm:w-[84vw] md:w-[960px] rounded-xl overflow-hidden border border-black/10 bg-black/5"
            >
              <div className="relative aspect-[4/3] md:aspect-[16/9]">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 640px) 86vw, (max-width: 768px) 84vw, 960px"
                  className="object-cover"
                />
                {/* bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-24 md:h-40 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                {/* text overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-8 text-white">
                  <p className="text-[12.5px] sm:text-sm md:text-base leading-snug md:leading-relaxed text-white/90">
                    {s.description}
                  </p>
                </div>
              </div>
              {/* subtle active indicator */}
              <div className={`h-[3px] ${active === i ? "bg-black" : "bg-transparent"}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
