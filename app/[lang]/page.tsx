export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  console.log(lang)
  return (
    <main className="flex flex-col items-center">
      
    </main>
  )
}