'use client'

import React, { useState, useEffect } from 'react';
import { Database, BarChart3, Brain, Search, ArrowRight, LucideProps } from 'lucide-react';
import Link from 'next/link';
import { getBlogPosts, SanityBlogPost } from '@/sanity/lib/sanity';

// Define the post interface
interface BlogPost {
  id: string;
  date: string;
  tag: string;
  title: string;
  description: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

// Same hardcoded posts as fallback (matching your blog page)
const fallbackPosts: BlogPost[] = [
  {
    id: '1',
    date: 'Jul 21, 2025',
    tag: 'Goodluck Udoh',
    title: "Why Data is the 'Brain' of Modern Companies ?",
    description: "Data powers decisions, drives operations, and transforms information into intelligence—the true brain of every modern company.",
    icon: Database,
  },
  {
    id: '2',
    date: 'Jul 03, 2025',
    tag: 'Goodluck Udoh',
    title: "From Spreadsheets to Systems: The Evolution of Enterprise Data Tools",
    description: "Enterprise data has outgrown spreadsheets—today's systems unify, automate, and scale insights to power smarter, faster decisions.",
    icon: BarChart3,
  },
  {
    id: '3',
    date: 'Jul 21, 2025',
    tag: 'Goodluck Udoh',
    title: "AI + Cortex: Unlocking Predictive and Adaptive Decision-Making",
    description: "Cortex, powered by AI, transforms data into foresight. It predicts outcomes, adapts in real time, empowers organizations to move faster, anticipate challenges, and act with precision.",
    icon: Brain,
  }
];

const iconMap: Record<string, React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>> = {
  'data': Database,
  'analytics': BarChart3,
  'ai': Brain,
  'brain': Brain,
  'systems': BarChart3,
  'default': Search,
};

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(fallbackPosts);

  useEffect(() => {
    // Fetch recent posts from Sanity
    async function fetchRecentPosts() {
      try {
        const sanityPosts: SanityBlogPost[] = await getBlogPosts();
        
        if (sanityPosts.length > 0) {
          // Convert Sanity posts and take first 3
          const convertedPosts: BlogPost[] = sanityPosts.slice(0, 3).map(post => {
            let icon = iconMap.default;
            const titleLower = post.title.toLowerCase();
            if (titleLower.includes('data') || titleLower.includes('brain')) icon = iconMap.data;
            if (titleLower.includes('ai') || titleLower.includes('cortex')) icon = iconMap.ai;
            if (titleLower.includes('system') || titleLower.includes('analytics')) icon = iconMap.analytics;
            
            return {
              id: post._id,
              date: new Date(post.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              }),
              tag: post.author || 'Spryntr Team',
              title: post.title,
              description: post.excerpt || `${post.title.substring(0, 120)}...`,
              icon: icon,
            };
          });
          
          // Combine Sanity posts with fallback posts, then take first 3
          const allPosts: BlogPost[] = [...convertedPosts, ...fallbackPosts];
          setBlogPosts(allPosts.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching recent posts:', error);
        // Keep fallback posts if Sanity fails
        setBlogPosts(fallbackPosts.slice(0, 3));
      }
    }

    fetchRecentPosts();
  }, []);

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-black mb-4">Blogs</h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Stay ahead with fresh ideas, industry trends, and deep dives into how data is 
          shaping smarter decisions.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {blogPosts.map((post) => {
          const IconComponent = post.icon;
          return (
            <Link 
              key={post.id} 
              href="/resources/blog"
              className="group cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <div className="flex gap-6 p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                {/* Content */}
                <div className="flex-1">
                  {/* Date and Tag */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                      {post.date}
                    </span>
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                      {post.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {post.description}
                  </p>

                  {/* Read More Indicator */}
                  <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                    Read more 
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                    <IconComponent 
                      size={32} 
                      className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300" 
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
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
  );
};

export default BlogSection;