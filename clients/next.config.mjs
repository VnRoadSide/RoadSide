/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks', '@mantine/form', '@mantine/hooks'],
  },
};

export default nextConfig;
