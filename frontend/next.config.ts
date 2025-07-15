import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/:path*`,
      },
      {
        source: '/socket.io/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/socket.io/:path*`,
      },
    ];
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
  //         }
  //       ]
  //     }
  //   ]
  // }
};

export default nextConfig;
