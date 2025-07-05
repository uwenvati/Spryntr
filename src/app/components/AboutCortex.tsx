"use client"

export default function AboutCortex() {
  return (
   <section className="pt-16 space-y-10 pb-0">


      {/* Cortex Image Panel */}
      <div className="bg-white px-6 md:px-20 overflow-hidden">
        <img
          src="/cortex-panel.jpg"
          alt="Cortex Overview"
          className="w-full h-auto rounded-2xl object-cover"
        />
      </div>

      {/* Heading + Text Section */}
      <div className="bg-[#F6F6F6] px-6 md:px-20 py-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold">
          Post-Generative AI Needs Better Data.
        </h2>
        <p className="mt-6 text-base md:text-lg max-w-4xl text-gray-700 mx-auto">
          The future of AI isn’t about bigger models. It’s about smarter, context-specific
          data from inside organizations. Spryntr enables embedded AI agents that
          understand workflows, goals, and act intelligently.
        </p>

        {/* Quote Card */}
        <div className="bg-white max-w-3xl mx-auto mt-10 px-6 py-6 rounded-xl border border-gray-300 text-center">
          <img
            src="/brain-icon.svg"
            alt="Brain Icon"
            className="w-6 h-6 mx-auto mb-2"
          />
          <p className="text-base text-gray-600 italic">
  &ldquo;Intelligence without context is just computation. Spryntr provides the context
  that transforms AI from a tool into a strategic advantage.&rdquo;
</p>

        </div>
      </div>
    </section>
  )
}
