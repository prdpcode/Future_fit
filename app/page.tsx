import Link from "next/link";
import { ArrowRight } from "lucide-react";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Future Fit",
  url: "https://wearfuturefit.com",
  logo: "https://wearfuturefit.com/opengraph-image",
  description: "AI-powered streetwear and custom apparel brand.",
  sameAs: [],
};

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-foreground/[0.03] rounded-full blur-[120px] animate-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-foreground/[0.04] rounded-full blur-[100px] animate-glow pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="flex flex-col items-center gap-6 text-center px-4 relative z-10">
        <p className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground animate-in fade-in duration-1000">
          AI-Powered Streetwear
        </p>

        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-shimmer animate-in fade-in slide-in-from-bottom-4 duration-1000">
          FUTURE FIT
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 leading-relaxed">
          Weightless design for the next generation.
        </p>

        <div className="mt-4 animate-in fade-in zoom-in duration-1000 delay-500">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-foreground text-background rounded-full font-bold text-base hover:scale-105 hover:shadow-soft-lg transition-all duration-300 shadow-soft"
          >
            Explore Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <div className="mt-12 flex items-center gap-8 text-xs text-muted-foreground animate-in fade-in duration-1000 delay-700">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Free Shipping
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            AI Fit Finder
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Premium Quality
          </span>
        </div>
      </div>
    </div>
  );
}
