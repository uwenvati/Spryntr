'use client'

import React, { useState, useEffect } from 'react'
import { Database, BarChart3, Brain, Search as SearchIcon, ArrowRight, type LucideProps } from 'lucide-react'
import Link from 'next/link'
import { getBlogPosts, SanityBlogPost } from '@/sanity/lib/sanity'

interface BlogPost {
  id: string
  date: string
  tag: string
  title: string
  description: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
    mainImage?: string      // ADD THIS
  imageAlt?: string       // ADD THIS
}

const iconMap: Record<string, BlogPost['icon']> = {
  data: Database,
  analytics: BarChart3,
  ai: Brain,
  brain: Brain,
  systems: BarChart3,
  default: SearchIcon,
}

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        const sanityPosts: SanityBlogPost[] = await getBlogPosts()

        const converted: BlogPost[] = sanityPosts.slice(0, 3).map((post) => {
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
            description: post.excerpt || `${post.title.substring(0, 120)}...`,
            icon,
            mainImage: post.mainImage?.asset?.url,           // ADD THIS
            imageAlt: post.mainImage?.alt || post.title,     // ADD THIS
          }
        })

        setBlogPosts(converted)
      } catch (err) {
        console.error('Error fetching recent posts:', err)
        setBlogPosts([]) // no fallbacks
      }
    }

    fetchRecentPosts()
  }, [])

  if (!blogPosts.length) return null

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-black mb-4">Blogs</h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Stay ahead with fresh ideas, industry trends, and deep dives into how data is shaping smarter decisions.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {blogPosts.map((post) => {
          const IconComponent = post.icon
          return (
            <Link
              key={post.id}
              href={`/resources/blog?post=${post.id}`}
              className="group cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <div className="flex gap-6 p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">{post.date}</span>
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">{post.tag}</span>
                  </div>

                  <h2 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.description}</p>

                  <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                    Read more
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Icon or Image */}
 <div className="flex-shrink-0 self-start">
  {post.mainImage ? (
    <img 
      src={post.mainImage}
      alt={post.imageAlt || post.title}
      className="w-16 h-16 rounded-lg object-cover"
    />
  ) : (
    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
      <IconComponent size={24} className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300" />
    </div>
  )}
</div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* View All Posts Button */}
      <div className="text-center">
        <Link
          href="/resources/blog"
          className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300"
        >
          View All Posts
          <ArrowRight size={20} className="ml-2" />
        </Link>
      </div>
    </section>
  )
}
