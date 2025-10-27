'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function StoryLayout({
  allPaths,
  lang,
  children,
}: {
  allPaths: { slug: string }[]
  lang: string
  children: React.ReactNode
}) {
  const topMenuRef = useRef<HTMLUListElement>(null)
  const [showBottomMenu, setShowBottomMenu] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBottomMenu(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    if (topMenuRef.current) {
      observer.observe(topMenuRef.current)
    }

    return () => {
      if (topMenuRef.current) {
        observer.unobserve(topMenuRef.current)
      }
    }
  }, [])

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:gap-16">
        {/* Top Menu */}
        <ul
          ref={topMenuRef}
          className="lg:w-3/5 w-full px-4 py-6 space-y-2 bg-gray-50 rounded-md shadow-sm lg:h-[30vh]"
        >
          {allPaths.map((path, index) => (
            <li key={index}>
              <Link
                href={`/${lang}/story/${path.slug}`}
                className="block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              >
                {path.slug}
              </Link>
            </li>
          ))}
        </ul>

        {/* Story Content */}
        <div className="lg:w-4/5 w-full px-4 py-6">{children}</div>
      </div>

      {/* Bottom Menu (Mobile only) */}
      {showBottomMenu && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50 lg:hidden">
          <ul className="flex overflow-x-auto whitespace-nowrap px-2 h-16 items-center">
            {allPaths.map((path, index) => (
              <li key={index} className="px-3">
                <Link
                  href={`/${lang}/story/${path.slug}`}
                  className="text-sm text-gray-700 hover:text-blue-500"
                >
                  {path.slug}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
