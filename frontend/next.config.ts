import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/spotify-api",
        destination: "http://host.docker.internal:8002",
      },
    ];
  },
};

export default nextConfig;
