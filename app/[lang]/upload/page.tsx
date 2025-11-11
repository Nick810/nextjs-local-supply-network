import FileUpload from '@/app/components/dropzone';

export default function Page() {

  return (
    <main className="py-32 container">
      <h1 className="text-xl font-semibold mb-4">Upload Payment Receipt</h1>
      <FileUpload />
    </main>
  );
}
