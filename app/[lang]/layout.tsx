import Footer from "../components/footer";
import Header from "../components/header";
import '@fontsource/crimson-text';
import '../styles/reset.css'
import '../styles/globals.css'
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import { routing } from "../i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
 
export function generateStaticParams() {
  return routing.locales.map((locale: string) => ({locale}));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }
  
  // Enable static rendering
  setRequestLocale(lang);

  return (
    <div data-lang={lang}>
      <NextIntlClientProvider>
        <Header lang={lang}/>
          {children}
        <Footer lang={lang} />
      </NextIntlClientProvider>
    </div>
  )
}