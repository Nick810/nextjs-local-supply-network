// /lib/actions.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SUPPORTED_LOCALES = ['en', 'th']; // ⬅️ Add all your supported locales
const DEFAULT_LOCALE = 'en';
const COOKIE_NAME = 'NEXT_LOCALE';

/**
 * Sets the locale cookie and redirects the user to the new localized route.
 * @param {string} locale - The chosen locale (e.g., 'en', 'th').
 * @param {string} redirectTo - The path to redirect to (e.g., '/', '/about').
 */
export async function setLocaleAndRedirect(locale: string, redirectTo: string = '/') {
  // 1. Validate the locale
  if (!SUPPORTED_LOCALES.includes(locale)) {
    console.error(`Attempted to set unsupported locale: ${locale}. Falling back to default.`);
    locale = DEFAULT_LOCALE;
  }

  const cookieStore = await cookies(); 
  // 2. Set the cookie
  cookieStore.set(COOKIE_NAME, locale, {
    maxAge: 365 * 24 * 60 * 60, // 1 year expiry
    path: '/', // Ensure the cookie is available across the entire site
    httpOnly: true, // Prevents client-side script access
    secure: process.env.NODE_ENV === 'production', // Use 'secure' in production
    sameSite: 'lax',
  });

  // 3. Redirect to the localized home page
  const newPath = `/${locale}${redirectTo}`;
  redirect(newPath);
}