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
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        { 
          key: "Content-Security-Policy", 
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://checkout.razorpay.com https://cdn.goaffpro.com https://www.google-analytics.com https://www.googletagmanager.com https://clarity.ms",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "img-src 'self' data: https: blob: https://images.unsplash.com",
            "font-src 'self' https://fonts.gstatic.com",
            "connect-src 'self' https://api.razorpay.com https://www.google-analytics.com https://klxaevflqknhfkiwpkne.supabase.co https://clarity.ms",
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
