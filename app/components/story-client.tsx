'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import StorySkeleton from './story-skeleton'

export default function StoryClient({ slug }: { slug: string }) {
  const Story = dynamic(() => import(`../[lang]/story/content/${slug}.mdx`), 
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
