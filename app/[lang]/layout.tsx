import Footer from "../components/footer";
import Header from "../components/header";
import '@fontsource/crimson-text';
import '../styles/reset.css'
import '../styles/globals.css'
import { getDictionary } from "./dictionaries";
import { t } from "../lib/utils";
import {NextIntlClientProvider} from 'next-intl';


export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'th' }]
}
 
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'th');
  
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