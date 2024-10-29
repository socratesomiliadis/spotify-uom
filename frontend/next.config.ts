import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
};

export default nextConfig;
