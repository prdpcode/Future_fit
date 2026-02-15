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
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('config','o8k2j');
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K8X9Q3L');
            (function(a,b,c,d,e,f,g){a['GrowSumoObject']=e;a[e]=a[e]||function(){
            (a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date();f=b.createElement(c),
            g=b.getElementsByTagName(c)[0];f.async=1;f.src=d;g.parentNode.insertBefore(f,g)
            })(window,document,'script','https://cdn.growsumo.com/assets/v3/growsumo.js','growsumo');
            growsumo.init({
              customer_key: 'pk_8f4b2c3d5e6a7b8c9d0e1f2a3b4c5d6e',
              application_key: 'sk_9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d'
            });
          `,
        }}
      />
    </html>
  );
}
