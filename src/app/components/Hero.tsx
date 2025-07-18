'use client'

export default function Hero() {
  return (
    <section className="mt-24 md:mt-0 flex flex-col-reverse md:flex-row items-center justify-between w-full bg-[#FCFCFD] pb-16 overflow-hidden relative z-10">

      {/* Left side: Text */}
      <div className="w-full md:w-[60%] px-6 md:px-16 space-y-6 relative">
        {/* Mobile-only Top Floating SVG */}
        <img
          src="/assets/images/hero-top.svg"
          alt="Top Graphic"
          className="absolute top-0 right-0 w-40 md:hidden animate-float-slow pointer-events-none"
        />

        <h1 className="mt-0 text-5xl md:text-6xl font-bold leading-[1.1] text-black z-10 relative">
          Structure. Connect. <br />
          <span className="bg-gradient-to-r from-black to-gray-600 text-transparent bg-clip-text">
            Activate your data.
          </span>
        </h1>

        <p className="text-gray-600 text-base md:text-lg leading-[1.6] max-w-xl z-10 relative">
          Spryntr is a data and intelligence company building the infrastructure that powers high-performing organizations. At the center is Cortex—a unified platform that acts as your organization’s brain.
        </p>

        <div className="flex md:block justify-center">
          <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md text-sm hover:bg-gray-900 transition z-10 relative">
            See Cortex in Action
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mobile-only Bottom Floating SVG */}
        <img
          src="/assets/images/hero-bottom.svg"
          alt="Bottom Graphic"
        className="absolute bottom-4 left-4 w-36 md:hidden animate-float-fast pointer-events-none"
        />
      </div>

      {/* Right side: Desktop image */}
      <div className="hidden md:flex w-full md:w-1/2 justify-end pr-0">
        <img
          src="/assets/images/hero-img.svg"
          alt="Hero Visual"
          className="w-full max-w-[450px] h-auto object-contain animate-float transition-transform duration-700 hover:scale-105"
        />
      </div>
    </section>
  )
}
