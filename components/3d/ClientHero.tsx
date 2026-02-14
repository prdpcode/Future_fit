"use client";

import dynamic from "next/dynamic";

// Lazy load the 3D scene so it doesn't block the initial UI
const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-transparent" />, // Invisible placeholder
});

export default function ClientHero() {
    return <HeroScene />;
}
