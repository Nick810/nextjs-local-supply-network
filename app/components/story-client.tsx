'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import StorySkeleton from './story-skeleton'

export default function StoryClient({ slug, lang }: { slug: string, lang: string }) {
  const Story = dynamic(() => import(`../../content/${lang}/${slug}.mdx`), 
  {
    ssr: false,
    loading: () => <StorySkeleton />,
  })

  return (
    <Suspense fallback={<StorySkeleton />}>
      <Story />
    </Suspense>
  )
}
