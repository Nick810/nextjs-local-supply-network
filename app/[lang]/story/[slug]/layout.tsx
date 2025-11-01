export default async function Layout({ 
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center">
      <div className="py-24">
        { children }
      </div>
    </main>
  )
}