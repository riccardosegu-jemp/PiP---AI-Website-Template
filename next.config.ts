import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next/image blocca per sicurezza gli host esterni non dichiarati qui.
    // cdn.sanity.io è l'host da cui arrivano tutte le immagini caricate nel CMS.
    // Se il cliente usa un dominio CDN custom di Sanity, aggiungerlo a questa lista.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
