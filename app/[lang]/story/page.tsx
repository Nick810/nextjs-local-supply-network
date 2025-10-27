import Link from 'next/link'
import fs from 'fs'
import path from 'path'

export default async function StoriesListPage({ 
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const storiesDir = path.join(process.cwd(), 'app/[lang]/story', 'content')
  const filenames = fs.readdirSync(storiesDir)

  const stories = filenames
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ''),
      title: file.replace(/\.mdx$/, ''), // You can replace this with frontmatter title later
  }))

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stories</h1>
      <ul className="space-y-2">
        {stories.map(({ slug, title }) => (
          <li key={slug}>
            <Link href={`/${lang}/story/${slug}`} className="text-blue-600 hover:underline">
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
