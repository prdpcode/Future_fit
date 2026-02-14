"use client";

import dynamic from "next/dynamic";

const DotWave = dynamic(() => import("@/components/layout/DotWave"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/layout/SmoothScroll"), { ssr: false });

export default function ClientEffects({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DotWave />
            <SmoothScroll>
                {children}
            </SmoothScroll>
        </>
    );
}
