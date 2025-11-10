// app/[lang]/upload/page.tsx
'use client';

import FileUpload from '@/app/components/dropzone';
// import Image from 'next/image';
// import { useState } from 'react';

export default function Page() {
  // const [file, setFile] = useState<File | null>(null);
  // const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  // const handleUpload = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append('receipt', file);

  //   setStatus('uploading');
  //   const res = await fetch('/api/upload', {
  //     method: 'POST',
  //     body: formData,
  //   });

  //   setStatus(res.ok ? 'success' : 'error');
  // };

  return (
    <main className="py-32 container">
      <h1 className="text-xl font-semibold mb-4">Upload Payment Receipt</h1>
      <FileUpload />
      {/* <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />
        {file && (
          <div className='relative aspect-3/4'>
            <Image
              src={URL.createObjectURL(file)}
              fill
              alt="Receipt preview"
              className="w-full h-auto mb-4 rounded object-contain"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Receipt
        </button>
      </form>

      {status === 'uploading' && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
      {status === 'success' && <p className="text-sm text-green-600 mt-2">Upload successful!</p>}
      {status === 'error' && <p className="text-sm text-red-600 mt-2">Upload failed. Try again.</p>} */}
    </main>
  );
}
