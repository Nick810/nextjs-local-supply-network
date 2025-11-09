// middleware.ts
import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import createMiddleware from 'next-intl/middleware';
import {routing} from './app/i18n/routing';
import Negotiator from 'negotiator';

// function getLocale(request: Request): string {
//   const negotiator = new Negotiator({ headers: Object.fromEntries(request.headers) });
//   const languages = negotiator.languages();
//   return match(languages, locales, defaultLocale);
// }

export default createMiddleware(routing);


// export function middleware(request: Request) {
//   const { pathname } = new URL(request.url);
//   const pathnameHasLocale = locales.some(
//     (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//   );

//   if (pathnameHasLocale) return;

//   const locale = getLocale(request);
//   const newUrl = new URL(`/${locale}${pathname}`, request.url);
//   return NextResponse.redirect(newUrl);
// }

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
