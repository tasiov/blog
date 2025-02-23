import { getSortedPostsData } from '@/lib/posts'
import Link from 'next/link'
import { format } from 'date-fns'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  const posts = getSortedPostsData()
  

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-16">
        <section>
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
            tasio.dev
          </h1>
          <div className="prose dark:prose-invert prose-lg">
            <p>
              Hey! My name is Tasio, and this is my personal blog. I typically write about my experiences with software development.
            </p>
          </div>
        </section>
        <ThemeToggle />
      </div>
      <section>
        <h2 className="text-2xl font-bold mb-8">Latest Posts</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post.id} className="border-b border-gray-200 dark:border-gray-800 pb-4">
              <Link href={`/posts/${post.id}`} className="block hover:text-blue-600 dark:hover:text-blue-400">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <time className="text-gray-600 dark:text-gray-400">
                  {format(new Date(post.date), 'MMMM d, yyyy')}
                </time>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
