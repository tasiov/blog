import { getPostData, getSortedPostsData } from '@/lib/posts'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'

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
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <time className="text-gray-600 block mb-8">
          {format(new Date(post.date), 'MMMM d, yyyy')}
        </time>
        <div 
          className="prose prose-lg"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    )
  } catch (error) {
    console.error(error)
    notFound()
  }
} 