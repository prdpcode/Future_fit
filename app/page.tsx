import Link from "next/link";
import { ArrowRight, Sparkles, Users, Trophy, Leaf } from "lucide-react";
import JSONLD from "@/components/JSONLD";
import LazyFeatureLoader from "@/components/performance/LazyFeatureLoader";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center relative overflow-hidden">
        <JSONLD />

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

      {/* Features Preview */}
      <div className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Experience the Future</h2>
            <p className="text-muted-foreground">AI-driven features that enhance your shopping journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg bg-background hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">AI Style Advisor</h3>
              <p className="text-sm text-muted-foreground">Personalized recommendations powered by AI</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-background hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Social Shopping</h3>
              <p className="text-sm text-muted-foreground">See how others style Future Fit</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-background hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Rewards System</h3>
              <p className="text-sm text-muted-foreground">Earn points and unlock achievements</p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-background hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Sustainability</h3>
              <p className="text-sm text-muted-foreground">Track your environmental impact</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lazy Loaded Features */}
      <LazyFeatureLoader feature="social-gallery" />
      <LazyFeatureLoader feature="rewards" />
      <LazyFeatureLoader feature="sustainability" />

          </div>
  );
}
