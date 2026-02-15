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
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background text-foreground relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <div className="flex flex-col items-center gap-8 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000">
          FUTURE FIT
        </h1>

        <div className="space-y-8">
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Weightless design for the next generation.
            <br />
            Customize your gear with AI-powered precision.
          </p>

          <div>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 animate-in fade-in zoom-in duration-1000 delay-500 shadow-xl"
            >
              Enter Shop
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
