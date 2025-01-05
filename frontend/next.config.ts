import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';
const backendUrl = isDev ? 'http://localhost:8080' : 'https://productiondomain.com/api';

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/:path*`
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: isDev ? 'http://localhost:3000' : 'https://yourdomain.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date' },
        ]
      }
    ]
  }
};

export default nextConfig;