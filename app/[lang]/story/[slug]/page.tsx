import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import matter from 'gray-matter'
// import StorySkeleton from '@/components/story-skeleton'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import Breadcrumb from '@/app/components/breadcrumb'
import StoryLayout from '@/app/components/story-layout'

const getAllPaths = (lang: string) => {
    const storiesDir = path.join(process.cwd(), 'content', lang)
    const filenames = fs.readdirSync(storiesDir)
    return filenames
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => ({
        slug: file.replace(/\.mdx$/, ''),
      }))
  }

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const allPaths = getAllPaths(lang);

  const filePath = path.join(process.cwd(), 'content', lang, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const source = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(source)
3
  return (
    <>
      <div className='container'>
        <Breadcrumb path={slug} lang={lang} type="story" isStaticPath />
      </div>
      <StoryLayout allPaths={allPaths} lang={lang}>
        <article className="prose prose-invert max-w-none pb-16 px-[2%]">
          {data.title && <h1 className="text-4xl! font-bold mb-8!">{data.title}</h1>}
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </article>
      </StoryLayout>
    </>
  )
}

// REMOVE generateStaticParams FROM HERE — it breaks!
// (Next.js will use the one from parent `story/page.tsx`)