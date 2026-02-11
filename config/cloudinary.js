import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const hasAll = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );

  console.log(
    hasAll
      ? "Cloudinary configured"
      : "Cloudinary not configured: missing env vars"
  );
};


export default connectCloudinary;
