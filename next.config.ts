import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**', // Optional: allows all paths
      },
    ],
    qualities: [75, 85, 100]
  },
};

export default nextConfig;
