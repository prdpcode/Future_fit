import type { Metadata } from "next";
import { Suspense } from "react";
import StudioWrapper from "@/components/studio/StudioWrapper";
import CanvasContainer from "@/components/studio/CanvasContainer";
import Toolbar from "@/components/studio/Toolbar";
import LayerManager from "@/components/studio/LayerManager";
import PropertiesPanel from "@/components/studio/PropertiesPanel";
import ExportTool from "@/components/studio/ExportTool";

export const metadata: Metadata = {
    title: "Design Studio — Customize Your Gear",
    description:
        "Use the Future Fit AI-powered design studio to customize tees, hoodies & apparel. Add graphics, text, and export your unique designs.",
    openGraph: {
        title: "Design Studio — Future Fit",
        description: "Customize your streetwear with AI-powered design tools.",
    },
};

export default function StudioPage() {
    return (
        <Suspense fallback={null}>
            <StudioWrapper>
                {/* Left Sidebar (Tools) */}
                <aside className="w-16 md:w-20 lg:w-24 h-full border-r border-border bg-card z-10 hidden md:flex flex-col items-center py-4 gap-8">
                    <div className="font-bold text-xl tracking-tighter">F\F</div>
                    <div className="flex-1 w-full px-2">
                        <Toolbar />
                    </div>
                </aside>

                {/* Main Canvas Area */}
                <main className="flex-1 relative bg-muted/20 overflow-hidden">
                    <ExportTool />
                    <CanvasContainer className="w-full h-full" />
                </main>

                {/* Right Sidebar (Layers/Properties) */}
                <aside className="w-64 h-full border-l border-border bg-card z-10 hidden lg:flex flex-col p-4">
                    <LayerManager />
                    <PropertiesPanel />
                </aside>
            </StudioWrapper>
        </Suspense>
    );
}
