'use client'

import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'

const FileUpload: React.FC = () => {
  const props = useSupabaseUpload({
    bucketName: 'receipts',
    path: '11mr9mj1_0',
    allowedMimeTypes: ['image/*'],
    maxFiles: 1,
    maxFileSize: 1000 * 1000 * 5,
    onUploadComplete: async (files) => {
      const file = files[0];

      // Send to Telegram
      await fetch('/api/notify-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: file.publicUrl,
          name: file.name,
          size: file.size,
          type: file.type,
        }),
      });

    },
  })

  return (
    <div className="w-[500px]">
      <Dropzone {...props}>
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
    </div>
  )
}

export default FileUpload;