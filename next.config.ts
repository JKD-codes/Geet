import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/music/:path*',
        destination: 'http://127.0.0.1:8000/:path*', // Proxy to FastAPI backend
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'yt3.googleusercontent.com',
      }
    ],
  },
  async rewrites() {
    return process.env.NODE_ENV === 'development' ? [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*',
      },
    ] : [];
  },
};

export default nextConfig;
