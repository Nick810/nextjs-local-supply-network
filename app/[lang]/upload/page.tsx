import FileUpload from '@/app/components/dropzone';

export default async function Page({ 
  params 
}: {
  params: Promise<{ lang: string }>
   }
) {
  const { lang } = await params;

  return (
    <main className="py-32 container">
      <h1 className="text-2xl font-semibold mb-4! text-center">Upload Payment Receipt</h1>
      <FileUpload lang={lang} />
    </main>
  );
}
