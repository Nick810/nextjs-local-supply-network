'use client'

import dynamic from 'next/dynamic'

export default function StoryClient({ slug }: { slug: string }) {
  const Story = dynamic(() => import(`../[lang]/story/content/${slug}.mdx`), {
    ssr: false,
  })

  return <Story />
}
