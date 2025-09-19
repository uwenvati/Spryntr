import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, // You'll get this from sanity.config.ts
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false, // Set to false if statically generating pages, or if you need the freshest data
  apiVersion: '2023-05-03',
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

// GROQ query for blog posts
export async function getBlogPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      body,
      "author": author->name,
      "categories": categories[]->title
    }
  `)
}

// GROQ query for single blog post
export async function getBlogPost(slug: string) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage,
      body,
      "author": author->name,
      "categories": categories[]->title
    }
  `, { slug })
}

// TypeScript types for your blog posts
export interface SanityBlogPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt?: string
  mainImage?: any
  body: any[]
  author: string
  categories: string[]
}