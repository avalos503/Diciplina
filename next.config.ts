import type { NextConfig } from "next";

const repo = "Diciplina";
const isPages = process.env.GITHUB_PAGES === "1";
const isStatic = isPages || process.env.STATIC_EXPORT === "1";
const basePath = isPages ? `/${repo}` : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isStatic
    ? {
        output: "export" as const,
        images: { unoptimized: true },
        trailingSlash: true,
        ...(basePath ? { basePath, assetPrefix: basePath } : {}),
      }
    : {}),
};

export default nextConfig;
