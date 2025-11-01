import Breadcrumb from '@/app/components/breadcrumb'
import StoryClient from '@/app/components/story-client'
import StoryLayout from '@/app/components/story-layout'
import fs from 'fs'
import path from 'path'

const getAllPaths = () => {
  const storiesDir = path.join(process.cwd(), 'app/[lang]/story', 'content')
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
  params: Promise<{ slug: string, lang: string }>
}) {
  const { slug, lang } = await params;
  const allPaths = getAllPaths();
 
  return (
    <>
      <div className='container'>
        <Breadcrumb path={slug} lang={lang} type="story" isStaticPath />
      </div>

      <StoryLayout allPaths={allPaths} lang={lang}>
        <StoryClient slug={slug} />
      </StoryLayout>
    </>
  )
}
 
export function generateStaticParams() {
  return getAllPaths();
}

export const dynamicParams = false