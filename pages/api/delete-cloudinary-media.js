import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { urls } = req.body;
      
      for (const url of urls) {
        const publicId = url.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }

      res.status(200).json({ message: 'Media deleted successfully' });
    } catch (error) {
      console.error('Error deleting media from Cloudinary:', error);
      res.status(500).json({ error: 'Failed to delete media' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}