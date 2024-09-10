/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  experimental: { esmExternals: "loose" },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "satudata.mubakab.go.id",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.mainFields = ["main", "browser", "module"];
    return config;
  },
};

module.exports = nextConfig;
