import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import Image from 'next/image';
import { VENDORS } from '@/app/lib/vendors';
import { getDictionary } from '../dictionaries';
import { t } from "../../lib/utils";

export default async function StoriesListPage({ 
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'th');
  const storiesDir = path.join(process.cwd(), 'content', lang)
  const filenames = fs.readdirSync(storiesDir)

  const stories = filenames
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ''),
      title: file.replace(/\.mdx$/, ''),
  }))

  return (
    <main className="py-32 container overflow-x-hidden">
      <h1 className="text-4xl font-bold mb-8!">{t(dict, 'interview.title')}</h1>
      <ul className="gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {stories.map(({ slug, title }) => {
          const vendor = VENDORS.find(v => v.name.toLowerCase() === title.toLowerCase());
          
          return (
            <li key={slug} className="">
              <Link href={`/${lang}/story/${slug}`} className='w-full cursor-pointer'>
                <div>
                  {vendor && (
                    <Image
                      src={vendor.storyCover}
                      alt={`${vendor.name} Story Cover`}
                      width={600}
                      height={600}
                      className="rounded shadow-lg"
                    />
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  )
}

// ADD THIS: Generate all [lang]/[slug] combinations
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content')
  const languages = fs.readdirSync(contentDir).filter(lang => 
    fs.statSync(path.join(contentDir, lang)).isDirectory()
  )

  const paths: { lang: string; slug: string }[] = []

  for (const lang of languages) {
    const langDir = path.join(contentDir, lang)
    if (!fs.existsSync(langDir)) continue

    const files = fs.readdirSync(langDir).filter(f => f.endsWith('.mdx'))
    for (const file of files) {
      const slug = file.replace('.mdx', '')
      paths.push({ lang, slug })
    }
  }

  return paths
}