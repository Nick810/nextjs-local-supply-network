import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import Image from 'next/image';
import { VENDORS } from '@/app/lib/vendors';

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
    <main className="py-32 container">
      <h1 className="text-4xl font-bold mb-8!">Stories</h1>
      <ul className="space-y-8">
        {stories.map(({ slug, title }) => {
          const vendor = VENDORS.find(v => v.name.toLowerCase() === title.toLowerCase());

          return (
            <li key={slug} className="flex items-center space-x-4 border-b pb-4">
              <Link href={`/${lang}/story/${slug}`} className='flex flex-row justify-between w-full cursor-pointer'>
                <div>
                  {vendor && (
                    <Image
                      src={vendor.logo}
                      alt={`${vendor.name} logo`}
                      width={100}
                      height={100}
                      className="rounded mb-4"
                    />
                  )}
                  
                  {title}
                </div>
                <button>Read story</button>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  )
}
