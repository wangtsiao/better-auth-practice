/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@node-rs/argon2'],
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "symmetrical-space-disco-vw746vv46g42697j-3000.app.github.dev"],
    }
  }
};

export default nextConfig;
