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
        destination: "http://fwk4g0wsg8sgg0gosco8sggo.167.235.203.74.sslip.io",
      },
    ];
  },
};

export default nextConfig;
