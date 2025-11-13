// import createMiddleware from 'next-intl/middleware';
// import {routing} from './app/i18n/routing';

// export default createMiddleware(routing);

// export const config = {
//   matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
// };


// middleware.ts
import createMiddleware from 'next-intl/middleware'
import { routing } from './app/i18n/routing'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. ถ้าเป็นหน้าเลือกภาษา → ให้ผ่านไปเลย (ไม่ต้อง intlMiddleware)
  if (pathname === '/language-select') {
    return NextResponse.next() // สำคัญ! ใช้ next() ไม่ใช่ intlMiddleware
  }

  // 2. ข้าม api + static
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 3. ตรวจสอบว่ามี cookie ภาษาหรือยัง
  const hasLocaleCookie = request.cookies.has('NEXT_LOCALE')

  // ถ้ายังไม่มี → ส่งไปเลือกภาษา (ไม่มี locale prefix)
  if (!hasLocaleCookie) {
    const url = request.nextUrl.clone()
    url.pathname = '/language-select'
    url.search = ''
    return NextResponse.redirect(url)
  }

  // มี cookie แล้ว → ให้ next-intl จัดการ (เพิ่ม /th หรือ /en)
  return intlMiddleware(request)
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}