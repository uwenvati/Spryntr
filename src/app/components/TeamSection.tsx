"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

type Member = { initials: string; name: string; role: string };

export default function TeamSection() {
  const team: Member[] = [
    { initials: "VR", name: "Vem Rinji", role: "UI/UX Designer" },
    { initials: "VM", name: "Vem Makplang", role: "Administrator" },
    { initials: "SJ", name: "Shammah John", role: "Frontend Developer" },
    { initials: "GU", name: "Goodluck Udom", role: "Backend Engineer" },
  ];

  const [tapActive, setTapActive] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const touchCapable =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouch(touchCapable);
  }, []);

  // duplicate items for seamless mobile marquee (but do NOT jump back on tap)
  const mobileItems = [...team, ...team];

  // helper to navigate without causing scroll jump
  const navigate = (href: string) => {
    window.location.assign(href);
  };

  return (
    <section className="bg-white py-14 px-4 md:px-6">
      {/* Heading + paragraph */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-block relative">
          <h2 className="text-4xl md:text-6xl font-extrabold text-black">
            Meet the Team
          </h2>
          <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="absolute inset-y-0 left-0 w-1/2 opacity-75 skew-x-12 spr-heading-shimmer-slow" />
          </span>
        </div>

        <p className="mt-4 text-gray-700 text-base md:text-lg leading-relaxed">
          A team of engineers, analysts, and innovators building the future of smarter decisions.
        </p>
      </div>

      {/* Mobile: auto-scrolling loop with extra spacing (independent items) */}
      <div className="md:hidden overflow-hidden">
        <div
          ref={trackRef}
          className={`flex items-start gap-10 w-max ${paused ? "" : "animate-scroll-loop-slow"}`}
          style={{ animationPlayState: paused ? "paused" : "running" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setTimeout(() => setPaused(false), 300)}
        >
          {mobileItems.map((m, idx) => {
            const active = tapActive === idx;
            return (
              <div key={`${m.initials}-${idx}`} className="flex flex-col items-center text-center select-none">
                <button
                  type="button"
                  className="group relative transition-transform duration-200"
                  onClick={() => {
                    if (isTouch) {
                      if (tapActive === idx) {
                        // second tap: navigate (no loop reset)
                        navigate("/about/team");
                      } else {
                        // first tap: show hover + pause, no navigation
                        setTapActive(idx);
                        setPaused(true);
                        window.setTimeout(() => {
                          setTapActive((cur) => (cur === idx ? null : cur));
                          setPaused(false);
                        }, 1200);
                      }
                    } else {
                      navigate("/about/team");
                    }
                  }}
                >
                  {/* Black ring base */}
                  <div className="w-20 h-20 rounded-full bg-black p-[3px]" />
                  {/* rotating sheen ring */}
                  <span aria-hidden className="ring-sheen absolute inset-0 rounded-full" />
                  {/* inner content */}
                  <div
                    className={[
                      "absolute inset-0 m-[3px] rounded-full bg-white border border-black/10",
                      "flex items-center justify-center",
                      "text-xl font-semibold text-black",
                      "transition-all duration-200",
                      active ? "scale-110 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]" : "group-hover:scale-110 group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]",
                    ].join(" ")}
                  >
                    {m.initials}
                  </div>
                </button>

                <p className="mt-3 font-semibold text-sm text-black">{m.name}</p>
                <p className="text-gray-700 text-xs">{m.role}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop: 4-up grid (no auto-scroll) */}
      <div className="hidden md:grid mx-auto max-w-5xl grid-cols-4 gap-y-12 gap-x-8 place-items-center">
        {team.map((m, idx) => {
          const active = tapActive === idx && isTouch;
          return (
            <Link
              key={idx}
              href="/about/team"
              className="group flex flex-col items-center text-center"
              onMouseLeave={() => !isTouch && setTapActive(null)}
              onClick={(e) => {
                if (isTouch && tapActive !== idx) {
                  e.preventDefault();
                  setTapActive(idx);
                }
              }}
            >
              <div className="relative transition-transform duration-200 group-hover:scale-110">
                <div className="w-24 h-24 rounded-full bg-black p-[3px]" />
                <span aria-hidden className="ring-sheen absolute inset-0 rounded-full" />
                <div
                  className={[
                    "absolute inset-0 m-[3px] rounded-full bg-white border border-black/10",
                    "flex items-center justify-center",
                    "text-2xl font-semibold text-black",
                    "transition-all duration-200",
                    active ? "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]" : "group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]",
                  ].join(" ")}
                >
                  {m.initials}
                </div>
              </div>

              <p className="mt-4 font-semibold text-base md:text-lg text-black">{m.name}</p>
              <p className="text-gray-700 text-sm">{m.role}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
