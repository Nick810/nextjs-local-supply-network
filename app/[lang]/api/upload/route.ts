// pages/api/upload.ts
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = './public/uploads';
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Upload failed' });
    res.status(200).json({ message: 'Receipt uploaded', file: files.receipt });
  });
}
