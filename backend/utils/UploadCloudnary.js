import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

// Function to upload an image to Cloudinary
const uploadCludnary = async (localfilepath) => {
  try {
    if (!localfilepath) {
      return null;
    }
    const result = await cloudinary.uploader.upload(localfilepath, { resource_type: 'auto', folder: 'Ecommerce' })
    fs.unlinkSync(localfilepath);
    return result;
  } catch (error) {
    fs.unlinkSync(localfilepath)
    return null;
  }
}

export { uploadCludnary }