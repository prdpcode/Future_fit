"use client";

import { ReactNode } from "react";
import { CanvasProvider } from "./CanvasContext";

export default function StudioWrapper({ children }: { children: ReactNode }) {
    return (
        <CanvasProvider>
            <div className="flex h-screen w-full bg-background overflow-hidden relative">
                {children}
            </div>
        </CanvasProvider>
    );
}
