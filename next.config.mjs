/** @type {import('next').NextConfig} */
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isGitHubPagesBuild
    ? {
        basePath: "/bastaeva-meat-catalog",
        env: { NEXT_PUBLIC_BASE_PATH: "/bastaeva-meat-catalog" },
      }
    : { env: { NEXT_PUBLIC_BASE_PATH: "" } }),
};

export default nextConfig;
