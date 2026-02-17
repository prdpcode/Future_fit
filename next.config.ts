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
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        { 
          key: "Content-Security-Policy", 
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://checkout.razorpay.com https://cdn.goaffpro.com https://www.google-analytics.com",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https: blob:",
            "font-src 'self'",
            "connect-src 'self' https://api.razorpay.com https://www.google-analytics.com https://klxaevflqknhfkiwpkne.supabase.co",
            "frame-src 'self' https://checkout.razorpay.com",
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
