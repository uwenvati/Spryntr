'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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
import { getBlogPosts, SanityBlogPost, PortableTextBlock } from '@/sanity/lib/sanity'
import { PortableText, PortableTextComponents } from '@portabletext/react'

type IconType = React.ComponentType<LucideProps>

interface BlogPost {
  id: string | number
  date: string
  tag: string
  title: string
  description: string
  icon: IconType
  content: string | PortableTextBlock[]
  isFromSanity?: boolean
}

const iconMap: Record<string, IconType> = {
  data: Database,
  analytics: BarChart3,
  ai: Brain,
  brain: Brain,
  systems: BarChart3,
  default: FileText,
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mb-3">{children}</h3>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
}

export default function BlogIndexClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState('')
  const [searchBy, setSearchBy] = useState<'Search by' | 'Date' | 'Time' | 'Name'>('Search by')
  const [showSearchBy, setShowSearchBy] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch only Sanity posts
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        const sanityPosts: SanityBlogPost[] = await getBlogPosts()

        const convertedSanityPosts: BlogPost[] = sanityPosts.map((post) => {
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
              day: 'numeric',
            }),
            tag: post.author || 'Spryntr Team',
            title: post.title,
            description: post.excerpt || `Read more about ${post.title}...`,
            icon,
            content: post.body,
            isFromSanity: true,
          }
        })

        setAllBlogPosts(convertedSanityPosts)
      } catch (error) {
        console.error('Error fetching Sanity posts:', error)
        setAllBlogPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // If URL has ?post=<id>, auto-open that post after posts load
  useEffect(() => {
    const q = searchParams.get('post')
    if (!q || allBlogPosts.length === 0) return
    const match = allBlogPosts.find((p) => String(p.id) === q)
    if (match) setSelectedPost(match)
  }, [searchParams, allBlogPosts])

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

  const handleBlogClick = (post: BlogPost) => {
    setSelectedPost(post)
    router.push(`/resources/blog?post=${post.id}`)
  }
  const closeBlogPost = () => {
    setSelectedPost(null)
    router.push('/resources/blog')
  }
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
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">{selectedPost.date}</span>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">{selectedPost.tag}</span>
              </div>
              <button
                onClick={closeBlogPost}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close article"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <h1 className="text-4xl font-bold text-black mb-8 text-center">{selectedPost.title}</h1>

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
                <PortableText value={selectedPost.content as PortableTextBlock[]} components={portableTextComponents} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content as string }} />
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center mb-16">
              <h1 className="mx-auto max-w-5xl text-[44px] leading-tight md:text-6xl lg:text-7xl font-extrabold tracking-tight text-black mb-2">
                Insights and perspectives
              </h1>
              <p className="text-gray-500 text-lg">Cortex Blogs</p>
            </div>

            {/* Search */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row gap-4 max-w-4xl w-full mx-auto relative">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800" size={20} />
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

            {/* Empty state */}
            {currentPosts.length === 0 ? (
              <div className="text-center py-16">
                <FileText size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No blog posts found</h3>
                <p className="text-gray-500">{searchTerm ? 'Try adjusting your search terms' : 'Check back soon for new content!'}</p>
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
                              <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">{post.date}</span>
                              <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">{post.tag}</span>
                            </div>

                            <h2 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">
                              {post.title}
                            </h2>

                            <p className="text-gray-600 text-sm leading-relaxed">{post.description}</p>
                          </div>

                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                              <Icon size={32} className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300" />
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
                      if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            className={`w-10 h-10 rounded-lg transition-colors ${
                              currentPage === pageNum ? 'bg-gray-900 text-white' : 'hover:bg-gray-100 text-gray-600'
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
    </div>
  )
}
