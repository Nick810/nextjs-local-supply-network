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
      {children}
    </div>
  )
}