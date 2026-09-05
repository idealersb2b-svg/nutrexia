/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@nutrexia/ui', '@nutrexia/types', '@nutrexia/validation', '@nutrexia/utils']
};

export default nextConfig;
