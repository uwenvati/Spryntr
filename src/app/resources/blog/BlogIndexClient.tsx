'use client'

import React, { useState, useEffect } from 'react'
import {
  Database,
  BarChart3,
  Brain,
  Search as SearchIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  FileText,
  type LucideProps,
} from 'lucide-react'
import Footer from '@/app/components/Footer'
import { getBlogPosts, SanityBlogPost } from '@/sanity/lib/sanity'
import { PortableText } from '@portabletext/react'

type IconType = React.ComponentType<LucideProps>

interface BlogPost {
  id: string | number
  date: string
  tag: string
  title: string
  description: string
  icon: IconType
  content: string | any[]
  isFromSanity?: boolean
}

// Map of icons for different categories/types
const iconMap: Record<string, IconType> = {
  'data': Database,
  'analytics': BarChart3,
  'ai': Brain,
  'brain': Brain,
  'systems': BarChart3,
  'default': FileText,
}

// Portable Text components for Sanity content
const PortableTextComponents = {
  block: {
    h1: ({children}: {children: React.ReactNode}) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({children}: {children: React.ReactNode}) => <h2 className="text-2xl font-bold mb-4">{children}</h2>,
    h3: ({children}: {children: React.ReactNode}) => <h3 className="text-xl font-bold mb-3">{children}</h3>,
    normal: ({children}: {children: React.ReactNode}) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
  marks: {
    strong: ({children}: {children: React.ReactNode}) => <strong>{children}</strong>,
    em: ({children}: {children: React.ReactNode}) => <em>{children}</em>,
  },
}

export default function BlogIndexClient() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchBy, setSearchBy] = useState<'Search by' | 'Date' | 'Time' | 'Name'>('Search by')
  const [showSearchBy, setShowSearchBy] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  // Hardcoded fallback posts
  const hardcodedPosts: BlogPost[] = [
    {
      id: 1,
      date: 'Jul 21, 2025',
      tag: 'Goodluck Udoh',
      title: "Why Data is the 'Brain' of Modern Companies ?",
      description:
        "Data powers decisions, drives operations, and transforms information into intelligence—the true brain of every modern company.",
      icon: Database,
      content: `
        <h2>Why Data is the 'Brain' of Modern Companies</h2>
        <p>In today's digital-first economy, data is no longer just a byproduct of business operations—it is the driving force behind innovation, strategy, and long-term growth. Just as the human brain processes information, directs actions, and adapts to changing environments, data now serves as the cognitive engine that powers modern organizations. Companies that learn to treat their data as a brain rather than a static archive of numbers unlock a competitive edge that defines success in the 21st century.</p>

        <h3>Data as the Decision-Making Core</h3>
        <p>The human brain constantly collects sensory inputs, processes them, and turns them into decisions. In the same way, data acts as the central nervous system for enterprises. From market trends to customer behavior, organizations rely on data to inform decisions at every level. Without it, decisions become guesswork—slow, risky, and disconnected from reality.</p>

        <h3>Breaking Free from Data Silos</h3>
        <p>Many enterprises struggle because their "brain" is fragmented. Data often sits in silos—different departments, tools, or legacy systems—making it hard to connect the dots. A fragmented brain cannot function efficiently, and the same applies to organizations with disconnected data. Unified data platforms bridge these gaps, creating a complete picture that fosters alignment, collaboration, and smarter strategies.</p>

        <h3>Powering Adaptability and Growth</h3>
        <p>What separates successful organizations from stagnant ones is adaptability. Just as the brain learns and evolves, data enables companies to predict market shifts, respond to disruptions, and scale intelligently. Businesses that harness data effectively move beyond hindsight reports and into foresight—using predictive analytics and AI-driven insights to anticipate challenges before they occur.</p>

        <h3>The Future: Data as the Brain, AI as the Nervous System</h3>
        <p>If data is the brain, then AI acts as the nervous system—accelerating processing, learning from patterns, and enabling real-time decision-making. Together, they empower companies to move from reactive to proactive, from rigid to adaptive, and from operational to truly intelligent.</p>
      `,
    },
    {
      id: 2,
      date: 'Jul 03, 2025',
      tag: 'Goodluck Udoh',
      title: 'From Spreadsheets to Systems: The Evolution of Enterprise Data Tools',
      description:
        "Enterprise data has outgrown spreadsheets—today's systems unify, automate, and scale insights to power smarter, faster decisions.",
      icon: BarChart3,
      content: `
        <h2>From Spreadsheets to Systems: The Evolution of Enterprise Data Tools</h2>
        <p>Enterprise data has outgrown spreadsheets—today's systems unify, automate, and scale insights to power smarter, faster decisions.</p>

        <h3>The Spreadsheet Era</h3>
        <p>For decades, spreadsheets were the go-to tool for data analysis. They were accessible, familiar, and flexible enough for most business needs. However, as data volumes grew exponentially, spreadsheets began to show their limitations.</p>

        <h3>Modern Data Systems</h3>
        <p>Today's enterprise data tools offer unprecedented capabilities for handling vast amounts of information, providing real-time analytics, and enabling collaborative decision-making across organizations.</p>

        <h3>The Future of Data Tools</h3>
        <p>As we move forward, enterprise data tools will continue to evolve, incorporating AI and machine learning to provide even more powerful insights and automation capabilities.</p>
      `,
    },
    {
      id: 3,
      date: 'Jul 21, 2025',
      tag: 'Goodluck Udoh',
      title: 'AI + Cortex: Unlocking Predictive and Adaptive Decision-Making',
      description:
        'Cortex, powered by AI, transforms data into foresight. It predicts outcomes, adapts in real time, empowers organizations to move faster, anticipate challenges, and act with precision.',
      icon: Brain,
      content: `
        <h2>AI + Cortex: Unlocking Predictive and Adaptive Decision-Making</h2>
        <p>Cortex, powered by AI, transforms data into foresight. It predicts outcomes, adapts in real time, empowers organizations to move faster, anticipate challenges, and act with precision.</p>

        <h3>The Power of Predictive Analytics</h3>
        <p>Traditional analytics tell you what happened. Predictive analytics powered by AI tell you what will happen, giving organizations the ability to prepare for future challenges and opportunities.</p>

        <h3>Real-Time Adaptation</h3>
        <p>Cortex doesn't just predict—it adapts. As new data flows in, the system continuously learns and adjusts its recommendations, ensuring that organizations stay ahead of rapidly changing market conditions.</p>

        <h3>Precision Decision-Making</h3>
        <p>By combining historical data with real-time inputs and predictive modeling, Cortex enables organizations to make decisions with unprecedented precision and confidence.</p>
      `,
    },
    {
      id: 4,
      date: 'Jul 03, 2025',
      tag: 'Goodluck Udoh',
      title:
        'Digital Backbones: The Secret Ingredient Behind Adaptive Organizations',
      description:
        'A strong digital backbone connects data, processes, and systems, enabling organizations to stay agile, adaptive, and future-ready.',
      icon: SearchIcon,
      content: `
        <h2>Digital Backbones: The Secret Ingredient Behind Adaptive Organizations</h2>
        <p>A strong digital backbone connects data, processes, and systems, enabling organizations to stay agile, adaptive, and future-ready.</p>

        <h3>What is a Digital Backbone?</h3>
        <p>A digital backbone is the underlying infrastructure that connects all of an organization's digital assets, from data repositories to applications to communication systems.</p>

        <h3>Building Adaptive Organizations</h3>
        <p>Organizations with strong digital backbones can quickly adapt to change, scale their operations efficiently, and respond to market demands with agility.</p>
      `,
    },
  ]

  // Fetch posts on component mount
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        
        // Try to fetch from Sanity
        const sanityPosts: SanityBlogPost[] = await getBlogPosts()
        
        // Convert Sanity posts to BlogPost format
        const convertedSanityPosts: BlogPost[] = sanityPosts.map(post => {
          // Determine icon based on title keywords or categories
          let icon = iconMap.default
          const titleLower = post.title.toLowerCase()
          if (titleLower.includes('data') || titleLower.includes('brain')) icon = iconMap.data
          if (titleLower.includes('ai') || titleLower.includes('cortex')) icon = iconMap.ai
          if (titleLower.includes('system') || titleLower.includes('analytics')) icon = iconMap.analytics
          
          return {
            id: post._id,
            date: new Date(post.publishedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            }),
            tag: post.author || 'Spryntr Team',
            title: post.title,
            description: post.excerpt || `Read more about ${post.title}...`,
            icon: icon,
            content: post.body,
            isFromSanity: true
          }
        })

        // Combine Sanity posts with hardcoded posts
        // Sanity posts first (most recent), then hardcoded posts
        const combinedPosts = [...convertedSanityPosts, ...hardcodedPosts]
        setAllBlogPosts(combinedPosts)
        
      } catch (error) {
        console.error('Error fetching Sanity posts:', error)
        // If Sanity fails, just use hardcoded posts
        setAllBlogPosts(hardcodedPosts)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filteredPosts = allBlogPosts.filter((post) => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return true

    switch (searchBy) {
      case 'Date':
        return post.date.toLowerCase().includes(q)
      case 'Time':
        return post.date.toLowerCase().includes(q)
      case 'Name':
        return post.tag.toLowerCase().includes(q)
      case 'Search by':
      default:
        return (
          post.title.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q) ||
          post.tag.toLowerCase().includes(q)
        )
    }
  })

  const postsPerPage = 4
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const handleBlogClick = (post: BlogPost) => setSelectedPost(post)
  const closeBlogPost = () => setSelectedPost(null)
  const goToPage = (page: number) => setCurrentPage(page)
  const goToPrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1)
  const goToNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1)

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-black rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="mt-28">
        {selectedPost ? (
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                  {selectedPost.date}
                </span>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                  {selectedPost.tag}
                </span>
                {selectedPost.isFromSanity && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                    CMS
                  </span>
                )}
              </div>
              <button
                onClick={closeBlogPost}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close article"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <h1 className="text-4xl font-bold text-black mb-8 text-center">
              {selectedPost.title}
            </h1>

            <div className="flex justify-center mb-12">
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                {(() => {
                  const Icon = selectedPost.icon
                  return <Icon size={48} className="text-gray-600" />
                })()}
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {selectedPost.isFromSanity ? (
                <PortableText 
                  value={selectedPost.content} 
                  components={PortableTextComponents}
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content as string }} />
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center mb-16">
              <h1 className="mx-auto max-w-5xl text-[44px] leading-tight md:text-6xl lg:text-7xl font-extrabold tracking-tight text-black mb-4">
                <span className="relative inline-block">
                  <span className="invisible">Insights and perspectives</span>
                  <span className="absolute inset-0 sheen-text">
                    Insights and perspectives
                  </span>
                </span>
              </h1>
              <p className="text-gray-500 text-lg">Cortex Blogs</p>
            </div>

            {/* Search */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row gap-4 max-w-4xl w-full mx-auto relative">
                <div className="flex-1 relative">
                  <SearchIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder={
                      searchBy === 'Date'
                        ? 'Search by date (e.g. Sep 17, 2025)'
                        : searchBy === 'Time'
                        ? 'Search by time'
                        : searchBy === 'Name'
                        ? 'Search by name'
                        : 'Search by article'
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  />
                </div>

                {/* Search-by dropdown */}
                <div className="relative sm:self-stretch sm:flex sm:items-stretch">
                  <button
                    type="button"
                    onClick={() => setShowSearchBy((s) => !s)}
                    aria-expanded={showSearchBy}
                    className="px-4 py-3 rounded-lg flex items-center gap-2 bg-[#555555] text-white hover:brightness-95 transition-colors sm:h-full"
                  >
                    <span>{searchBy}</span>
                    <ChevronDown size={16} />
                  </button>

                  {showSearchBy && (
                    <div
                      className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-md z-10"
                      onMouseLeave={() => setShowSearchBy(false)}
                    >
                      {(['Date', 'Time', 'Name'] as const).map((opt) => (
                        <button
                          key={opt}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                          onClick={() => {
                            setSearchBy(opt)
                            setShowSearchBy(false)
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                      <div className="border-t" />
                      <button
                        className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
                        onClick={() => {
                          setSearchBy('Search by')
                          setShowSearchBy(false)
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Show message if no posts */}
            {currentPosts.length === 0 ? (
              <div className="text-center py-16">
                <FileText size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No blog posts found</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Try adjusting your search terms' : 'Check back soon for new content!'}
                </p>
              </div>
            ) : (
              <>
                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {currentPosts.map((post) => {
                    const Icon = post.icon
                    return (
                      <div
                        key={post.id}
                        onClick={() => handleBlogClick(post)}
                        className="group cursor-pointer transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex gap-6 p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                              <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                                {post.date}
                              </span>
                              <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                                {post.tag}
                              </span>
                              {post.isFromSanity && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                  CMS
                                </span>
                              )}
                            </div>

                            <h2 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">
                              {post.title}
                            </h2>

                            <p className="text-gray-600 text-sm leading-relaxed">
                              {post.description}
                            </p>
                          </div>

                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                              <Icon
                                size={32}
                                className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={goToPrevious}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={20} className="text-gray-600" />
                    </button>

                    {Array.from({ length: totalPages }).map((_, index) => {
                      const pageNum = index + 1
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            className={`w-10 h-10 rounded-lg transition-colors ${
                              currentPage === pageNum
                                ? 'bg-gray-900 text-white'
                                : 'hover:bg-gray-100 text-gray-600'
                            }`}
                            aria-current={currentPage === pageNum ? 'page' : undefined}
                          >
                            {pageNum}
                          </button>
                        )
                      } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                        return (
                          <span key={pageNum} className="text-gray-400 px-2">
                            …
                          </span>
                        )
                      }
                      return null
                    })}

                    <button
                      onClick={goToNext}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Next page"
                    >
                      <ChevronRight size={20} className="text-gray-600" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      <Footer />

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .sheen-text {
          background: linear-gradient(90deg, #b0b0b0 0%, #d9d9d9 25%, #f5f5f5 50%, #d9d9d9 75%, #b0b0b0 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 6s linear infinite;
        }
      `}</style>
    </div>
  )
}