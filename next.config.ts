import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["evans-dana-pdt-broadcast.trycloudflare.com", "localhost:3000"]
    }
  },
  // Allows HMR and dev resources to work over the tunnel
  allowedDevOrigins: ["evans-dana-pdt-broadcast.trycloudflare.com"]
};

export default nextConfig;
