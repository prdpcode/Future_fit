import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background text-foreground overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <main className="z-10 flex flex-col items-center gap-8 text-center px-4">
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-700">
          FUTURE FIT
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Weightless design for the next generation.
          <br />
          Customize your gear with AI-powered precision.
        </p>

        <Link
          href="/studio"
          className="group mt-8 flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 animate-in fade-in zoom-in duration-1000 delay-500"
        >
          Enter Studio
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </main>

      <footer className="absolute bottom-8 text-sm text-muted-foreground">
        © 2026 Future Fit AI Studio
      </footer>
    </div>
  );
}
