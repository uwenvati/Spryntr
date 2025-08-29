import React from 'react';
import { Database, BarChart3, Brain, Search } from 'lucide-react';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      date: 'Jul 21, 2023',
      tag: 'Goodluck Udoh',
      title: "Why Data is the 'Brain' of Modern Companies ?",
      description: "Data powers decisions, drives operations, and transforms information into intelligence—the true brain of every modern company.",
      icon: Database,
      href: "/blog/why-data-is-brain"
    },
    {
      id: 2,
      date: 'Jul 03, 2023',
      tag: 'Goodluck Udoh',
      title: "From Spreadsheets to Systems: The Evolution of Enterprise Data Tools",
      description: "Enterprise data has outgrown spreadsheets—today's systems unify, automate, and scale insights to power smarter, faster decisions.",
      icon: BarChart3,
      href: "/blog/spreadsheets-to-systems"
    },
    {
      id: 3,
      date: 'Jul 21, 2023',
      tag: 'Goodluck Udoh',
      title: "AI + Cortex: Unlocking Predictive and Adaptive Decision-Making",
      description: "Cortex, powered by AI, transforms data into foresight. It predicts outcomes, adapts in real time, empowers organizations to move faster, anticipate challenges, and act with precision.",
      icon: Brain,
      href: "/blog/ai-cortex-predictive"
    },
    {
      id: 4,
      date: 'Jul 03, 2023',
      tag: 'Goodluck Udoh',
      title: "Digital Backbones: The Secret Ingredient Behind Adaptive Organizations",
      description: "A strong digital backbone connects data, processes, and systems, enabling organizations to stay agile, adaptive, and future-ready.",
      icon: Search,
      href: "/blog/digital-backbones"
    }
  ];

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {blogPosts.map((post) => {
          const IconComponent = post.icon;
          return (
            <div
              key={post.id}
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
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {post.description}
                  </p>
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
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BlogSection;