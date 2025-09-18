import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        // No 'pathname' or 'port' is needed here, making it more flexible.
      },
    ],
  },
  // other config options can go here
};

export default nextConfig;