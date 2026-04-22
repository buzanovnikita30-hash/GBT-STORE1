/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      { source: "/order", destination: "/checkout", permanent: true },
      { source: "/chatgpt", destination: "/", permanent: true },
      { source: "/pricing", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
