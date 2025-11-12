'use client'

import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'

type Props = {
  lang: string
}

const FileUpload: React.FC<Props> = ({ lang }) => {
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
    <div className="w-full max-w-lg mx-auto">
      <Dropzone {...props}>
        <DropzoneEmptyState />
        <DropzoneContent lang={lang} />
      </Dropzone>
    </div>
  )
}

export default FileUpload;