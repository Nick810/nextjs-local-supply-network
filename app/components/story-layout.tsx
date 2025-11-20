'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
  const pathname = usePathname()
  const currentSlug = pathname.split('/').pop()

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
      <div className="flex flex-col lg:flex-row lg:gap-16 lg:ml-8">
        {/* Top Menu */}
        <ul
          ref={topMenuRef}
          className="w-full lg:w-3/5 px-4 py-6 space-y-2  rounded-lg shadow-2xl/5
                    lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:overflow-y-auto
                    custom-scrollbar hidden lg:block"
        >
          {allPaths.map((path, index) => {
            const isActive = path.slug === currentSlug
            return (
              <li key={index}>
                <Link
                  href={`/${lang}/story/${path.slug}`}
                  className={`block px-4 py-2 rounded-md transition-all duration-200
                    ${isActive
                      ? 'bg-accent text-white! font-medium shadow-sm translate-x-1'
                      : 'text-gray-700 hover:bg-red-100 hover:text-accent hover:translate-x-1'
                    }`}
                >
                  {path.slug}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Story Content */}
          <div className="w-full lg:w-4/5 px-4 py-6 lg:pt-0">{children}</div>
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
