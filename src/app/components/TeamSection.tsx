"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const touchCapable =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouch(touchCapable);
  }, []);

  // duplicate items for seamless mobile marquee
  const mobileItems = [...team, ...team];

  return (
    <section className="bg-white py-14 px-4 md:px-6">
      {/* Heading + paragraph */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-block relative">
          <h2 className="text-4xl md:text-6xl font-extrabold text-black">
            Meet the Team
          </h2>
          {/* brighter + slower sheen sweep */}
          <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="absolute inset-y-0 left-0 w-1/2 opacity-75 skew-x-12 spr-heading-shimmer-slow" />
          </span>
        </div>

        <p className="mt-4 text-gray-700 text-base md:text-lg leading-relaxed">
          A team of engineers, analysts, and innovators building the future of smarter decisions.
        </p>
      </div>

      {/* Mobile: auto-scrolling loop with extra spacing */}
      <div className="md:hidden overflow-hidden">
        <div
          className={`flex items-start gap-8 w-max ${paused ? "" : "animate-scroll-loop-slow"}`}
          style={{ animationPlayState: paused ? "paused" : "running" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setTimeout(() => setPaused(false), 300)}
        >
          {mobileItems.map((m, idx) => {
            const active = tapActive === idx;
            return (
              <Link
                key={`${m.initials}-${idx}`}
                href="/about/team"
                className="group flex flex-col items-center text-center select-none"
                onClick={(e) => {
                  if (isTouch && tapActive !== idx) {
                    e.preventDefault(); // first tap → activate
                    setTapActive(idx);
                    window.setTimeout(() => {
                      setTapActive((cur) => (cur === idx ? null : cur));
                    }, 1200);
                  }
                }}
              >
                {/* Black ring with rotating sheen around it */}
                <div className="relative transition-transform duration-200 group-hover:scale-110">
                  {/* Outer black ring base */}
                  <div className="w-20 h-20 rounded-full bg-black p-[3px]" />
                  {/* Rotating sheen ring (sits above black) */}
                  <span
                    aria-hidden
                    className="ring-sheen absolute inset-0 rounded-full"
                  />
                  {/* Inner white circle content (sits above ring, leaving ring as 3px) */}
                  <div
                    className={[
                      "absolute inset-0 m-[3px] rounded-full bg-white border border-black/10",
                      "flex items-center justify-center",
                      "text-xl font-semibold text-black",
                      "transition-shadow duration-200",
                      active || undefined
                        ? "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]"
                        : "group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]",
                    ].join(" ")}
                    onTouchStart={() => isTouch && setTapActive(idx)}
                  >
                    {m.initials}
                  </div>
                </div>

                <p className="mt-3 font-semibold text-sm text-black">{m.name}</p>
                <p className="text-gray-700 text-xs">{m.role}</p>
              </Link>
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
                  e.preventDefault(); // first tap → activate
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
                    "transition-shadow duration-200",
                    active || undefined
                      ? "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]"
                      : "group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]",
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
