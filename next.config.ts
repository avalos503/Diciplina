import type { NextConfig } from "next";

const repo = "Diciplina";
const isPages = process.env.GITHUB_PAGES === "1";
const basePath = isPages ? `/${repo}` : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isPages
    ? {
        output: "export" as const,
        images: { unoptimized: true },
        trailingSlash: true,
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;
