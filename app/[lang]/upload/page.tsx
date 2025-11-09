// app/[lang]/upload/page.tsx
'use client';

export default function Page() {
  return (
    <form action="/api/upload" method="POST" encType="multipart/form-data">
      <label htmlFor="receipt">Upload your payment receipt:</label>
      <input type="file" name="receipt" accept="image/*" required />
      <button type="submit">Submit</button>
    </form>
  );
}
