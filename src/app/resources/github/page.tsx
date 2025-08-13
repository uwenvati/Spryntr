export default function GitHubPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#FCFCFD]">
      <h1 className="text-4xl font-bold text-black mb-4">GitHub</h1>
      <p className="text-gray-600 text-center max-w-2xl mb-6">
        Explore our repositories, star your favorites, and follow development updates.
      </p>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full"
      >
        Open GitHub
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
             viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </main>
  )
}
