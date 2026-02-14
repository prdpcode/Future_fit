"use client";

import { useCanvas } from "./CanvasContext";
import { removeBackground, enhanceImage, applyStyle } from "@/actions/ai";
import { useState } from "react";
import * as fabric from "fabric";
import { Sparkles, Wand2, Paintbrush, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PropertiesPanel() {
    const { canvas, activeObject } = useCanvas();
    const [processing, setProcessing] = useState<string | null>(null);

    if (!activeObject || activeObject.type !== 'image') return null;

    const handleAction = async (action: string, fn: (fd: FormData, ...args: any[]) => Promise<string>, ...args: any[]) => {
        if (processing) return;
        setProcessing(action);

        try {
            // Retrieve image source
            // @ts-ignore
            const imgObj = activeObject as fabric.Image;
            const src = imgObj.getSrc();

            // Fetch the image to create a Blob
            const res = await fetch(src);
            const blob = await res.blob();

            const formData = new FormData();
            formData.append("image", blob, "image.png");

            const newBase64 = await fn(formData, ...args);

            // setSrc requires a callback in old versions, or returns promise in new?
            // In v6+ it's setSrc(url).then(...)
            // Let's try to support both or assume v6 based on package.json

            // @ts-ignore
            if (imgObj.setSrc.length === 1) { // Promise based (likely)
                // @ts-ignore
                await imgObj.setSrc(newBase64);
            } else {
                await new Promise<void>((resolve) => {
                    // @ts-ignore
                    imgObj.setSrc(newBase64, () => resolve());
                });
            }

            canvas?.requestRenderAll();
        } catch (error) {
            console.error("AI Action failed:", error);
        } finally {
            setProcessing(null);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full border-t border-border pt-4 mt-auto">
            <h3 className="font-semibold text-xs uppercase text-muted-foreground">AI Tools</h3>
            <div className="grid grid-cols-1 gap-2">
                <button
                    onClick={() => handleAction('remove-bg', removeBackground)}
                    disabled={!!processing}
                    className={cn(
                        "flex items-center gap-2 p-2 rounded-md transition-colors bg-secondary hover:bg-white text-sm",
                        processing === 'remove-bg' && "opacity-50"
                    )}
                >
                    {processing === 'remove-bg' ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    Magic Clean (Remove BG)
                </button>

                <button
                    onClick={() => handleAction('enhance', enhanceImage)}
                    disabled={!!processing}
                    className={cn(
                        "flex items-center gap-2 p-2 rounded-md transition-colors bg-secondary hover:bg-white text-sm",
                        processing === 'enhance' && "opacity-50"
                    )}
                >
                    {processing === 'enhance' ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
                    Polish (Enhance)
                </button>

                <button
                    onClick={() => handleAction('style', applyStyle, 'cyber-minimalist')}
                    disabled={!!processing}
                    className={cn(
                        "flex items-center gap-2 p-2 rounded-md transition-colors bg-secondary hover:bg-white text-sm",
                        processing === 'style' && "opacity-50"
                    )}
                >
                    {processing === 'style' ? <Loader2 size={16} className="animate-spin" /> : <Paintbrush size={16} />}
                    Style Transfer
                </button>
            </div>
        </div>
    );
}
