/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'admin.nutrexia.in',
          },
        ],
        destination: 'https://nutrexia.in/admin/:path*',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;
