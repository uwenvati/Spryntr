import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
})

// GROQ query for blog posts
export async function getBlogPosts() {
  try {
    return await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        body,
        "author": author->name,
        "categories": categories[]->title
      }
    `)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

// TypeScript types
export interface SanityBlogPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  body: PortableTextBlock[]
  author: string
  categories: string[]
}

// Portable Text block type
export interface PortableTextBlock {
  _key: string
  _type: string
  children?: PortableTextSpan[]
  markDefs?: PortableTextMarkDef[]
  style?: string
}

export interface PortableTextSpan {
  _key: string
  _type: 'span'
  marks?: string[]
  text: string
}

export interface PortableTextMarkDef {
  _key: string
  _type: string
}