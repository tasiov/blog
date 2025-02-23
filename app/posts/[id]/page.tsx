import { getPostData, getSortedPostsData } from '@/lib/posts'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import ThemeToggle from '@/components/ThemeToggle'
import SocialLinks from '@/components/SocialLinks'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    id: post.id,
  }))
}

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params
  const post = await getPostData(id)
  
  // Get the first paragraph of content as description
  const description = post.content
    .split('</p>')[0]
    .replace(/<[^>]*>/g, '')
    .slice(0, 200) + '...'

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      images: [{
        url: post.imageUrl,
        width: 1200,
        height: 630,
        alt: `Abstract visualization for ${post.title}`
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.imageUrl],
    }
  }
}

export default async function Post({ params }: { params: Params }) {
  try {
    const { id } = await params
    const post = await getPostData(id)
    
    return (
      <article className="max-w-4xl mx-auto py-8 px-4">
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </Link>

        <div className="mb-8 relative h-64">
          <Image 
            src={post.imageUrl} 
            alt={`Abstract visualization for ${post.title}`}
            fill
            priority
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <time className="text-gray-600 dark:text-gray-400 block">
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
          </div>
          <div className="flex items-center gap-4">
            <SocialLinks />
            <ThemeToggle />
          </div>
        </div>
        <div 
          className="prose dark:prose-invert prose-lg"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    )
  } catch (error) {
    console.error(error)
    notFound()
  }
} 