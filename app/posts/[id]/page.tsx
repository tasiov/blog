import { getPostData, getSortedPostsData } from '@/lib/posts'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import ThemeToggle from '@/components/ThemeToggle'
import SocialLinks from '@/components/SocialLinks'

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    id: post.id,
  }))
}

interface PageProps {
  params: {
    id: string
  }
}

export default async function Post({ params }: PageProps) {
  try {
    const { id } = await params
    const post = await getPostData(id)
    
    return (
      <article className="max-w-4xl mx-auto py-8 px-4">
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