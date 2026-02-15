import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import ClientEffects from "@/components/layout/ClientEffects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://wearfuturefit.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Future Fit | AI-Powered Streetwear & Futuristic Fashion",
    template: "%s | Future Fit",
  },
  description:
    "Discover Future Fit, India's premier AI-driven streetwear brand. Shop our collections of oversized tees, hoodies, and tech-fleece apparel designed with AI precision.",
  keywords: [
    "Future Fit",
    "AI Streetwear",
    "Futuristic Fashion India",
    "Oversized T-shirts",
    "Tech Noir Apparel",
    "AI fashion",
    "streetwear India",
    "oversized hoodie",
    "online clothing store",
  ],
  authors: [{ name: "Future Fit", url: SITE_URL }],
  creator: "Future Fit AI Studio",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Future Fit",
    title: "Future Fit | AI-Powered Streetwear & Futuristic Fashion",
    description:
      "Discover Future Fit, India's premier AI-driven streetwear brand. Oversized tees, hoodies, and tech-fleece apparel.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Fit | AI-Powered Streetwear & Futuristic Fashion",
    description:
      "Discover Future Fit, India's premier AI-driven streetwear brand. Shop oversized tees, hoodies & tech-fleece apparel.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: SITE_URL },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootLayoutClient>
          <ClientEffects>
            {children}
          </ClientEffects>
        </RootLayoutClient>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      {/* PartnerStack (GrowSumo) Production Tracking */}
      <Script
        id="partnerstack-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(a,b,c,d,e,f,g){a['GrowSumoObject']=e;a[e]=a[e]||function(){
            (a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date();f=b.createElement(c),
            g=b.getElementsByTagName(c)[0];f.async=1;f.src=d;g.parentNode.insertBefore(f,g)
            })(window,document,'script','https://cdn.growsumo.com/assets/v3/growsumo.js','growsumo');
          `,
        }}
      />
    </html>
  );
}
