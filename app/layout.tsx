import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import ClientEffects from "@/components/layout/ClientEffects";
import "@/lib/env-validation";

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
      {/* GoAffPro Tracking */}
      <Script
        id="goaffpro-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,o,f,js,fjs){
              w['GoAffProObject']=o;w[o]=w[o]||function(){
              (w[o].q=w[o].q||[]).push(arguments)};w[o].l=1*new Date();
              js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
              js.async=1;js.src=f;fjs.parentNode.insertBefore(js,fjs);
            })(window,document,'script','goaffpro','https://cdn.goaffpro.com/goaffpro.js');
            goaffpro('init', 'future-fit');
          `,
        }}
      />
    </html>
  );
}
