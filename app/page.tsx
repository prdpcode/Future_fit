 import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ClientHero from "@/components/3d/ClientHero";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background text-foreground overflow-hidden relative">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <ClientHero />
      </div>

      <main className="z-10 flex flex-col items-center gap-8 text-center px-4 pointer-events-none">
        {/* Title is now part of the 3D scene overlay or can remain here if we want mixing */}
        {/* We moved the big titlte to the 3D scene component for better layering, 
            but let's keep the CTA and subtitle here as an overlay */}

        <div className="mt-[40vh] space-y-8">
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 bg-background/50 backdrop-blur-sm p-4 rounded-xl">
            Weightless design for the next generation.
            <br />
            Customize your gear with AI-powered precision.
          </p>

          <div className="pointer-events-auto">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 animate-in fade-in zoom-in duration-1000 delay-500 shadow-xl"
            >
              Enter Shop
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-8 text-sm text-muted-foreground z-10">
        © 2026 Future Fit AI Studio
      </footer>
    </div>
  );
}
