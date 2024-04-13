/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
      {
        hostname: "zztnkfsrj8jewo8a.public.blob.vercel-storage.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
