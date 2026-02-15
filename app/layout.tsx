import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://wearfuturefit.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Future Fit — AI-Powered Streetwear & Custom Apparel",
    template: "%s | Future Fit",
  },
  description:
    "Discover next-gen streetwear designed with AI precision. Virtual fitting room, custom studio, heavyweight hoodies, oversized tees & more. Free shipping across India.",
  keywords: [
    "Future Fit",
    "AI fashion",
    "streetwear India",
    "custom clothing",
    "virtual fitting room",
    "oversized hoodie",
    "heavyweight tee",
    "online clothing store",
    "futuristic fashion",
  ],
  authors: [{ name: "Future Fit", url: SITE_URL }],
  creator: "Future Fit AI Studio",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Future Fit",
    title: "Future Fit — AI-Powered Streetwear & Custom Apparel",
    description:
      "Next-gen streetwear designed with AI. Virtual fitting, custom studio, premium quality.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Fit — AI-Powered Streetwear",
    description:
      "Next-gen streetwear designed with AI. Virtual fitting, custom studio, premium quality.",
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
    </html>
  );
}
