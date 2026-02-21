import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@supabase/supabase-js",
      "@react-three/drei",
      "@react-three/fiber",
      "three",
      "fabric",
    ],
    optimizeServerReact: true,
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { 
          key: "Content-Security-Policy", 
          value: [
            "default-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://cdn.goaffpro.com https://www.google-analytics.com https://www.googletagmanager.com https://clarity.ms https://www.clarity.ms",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "img-src 'self' data: https: blob: https://images.unsplash.com https://unsplash.com",
            "font-src 'self' https://fonts.gstatic.com data:",
            "connect-src 'self' https://api.razorpay.com https://www.google-analytics.com https://klxaevflqknhfkiwpkne.supabase.co https://clarity.ms https://www.clarity.ms",
            "frame-src 'self' https://checkout.razorpay.com https://www.googletagmanager.com",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'"
          ].join("; ")
        },
      ],
    },
    {
      source: "/(.*)\\.(js|css|woff2|png|jpg|svg|ico)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
  ],
};

export default nextConfig;
