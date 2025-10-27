import Footer from "../components/footer";
import Header from "../components/header";
import Subscribe from "../components/subscription";


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
  
  return (
    <div data-lang={lang}>
      <Header bgColor={"fff"} lang={lang}/>
      {children}
      <Subscribe />
      <Footer lang={lang} />
      {/* <ThemeHydrator handle="theme_color"/> */}
    </div>
  )
}