'use client'

export default function Hero() {
  return (
   <section className="flex flex-col-reverse md:flex-row items-center justify-between w-full bg-[#FCFCFD] pt-0 pb-16 overflow-hidden">
 
{/* Left side: Text */}
<div className="w-full md:w-[60%] px-6 md:px-16 space-y-6">

  <h1 className="mt-0 text-6xl font-bold leading-[1.1] text-black">
    Structure. Connect. <br />
    <span className="bg-gradient-to-r from-black to-gray-600 text-transparent bg-clip-text">
      Activate your data.
    </span>
  </h1>

  <p className="text-gray-600 text-base md:text-lg leading-[1.6] max-w-xl">
    Spryntr is a data and intelligence company building the infrastructure that powers high-performing organizations. At the center is Cortex—a unified platform that acts as your organization’s brain.
  </p>

  <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md text-sm hover:bg-gray-900 transition">
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



  {/* Right side: Image */}
<div className="w-full md:w-1/2 flex justify-end">
  <img
    src="/assets/images/hero-img.svg"
    alt="Hero Visual"
    className="w-[80%] md:w-[70%] lg:w-[65%] h-auto object-contain animate-float transition-transform duration-700 hover:scale-105"
  />
</div>

</section>

  )
} 