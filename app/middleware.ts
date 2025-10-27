// middleware.ts
import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'th'];
const defaultLocale = 'en';

function getLocale(request: Request): string {
  const negotiator = new Negotiator({ headers: Object.fromEntries(request.headers) });
  const languages = negotiator.languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
