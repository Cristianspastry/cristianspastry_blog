import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Remove localPatterns as it's not a valid config option
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.giallozafferano.it',
        port: '',
        pathname: '/images/**', // Use /** to match any path under /images/
      },
    ],
  },
};

export default nextConfig;
