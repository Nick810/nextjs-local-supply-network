export default async function Layout({ 
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center container">
      <div className="py-16">
        { children }
      </div>
    </main>
  )
}