"use client";

import { useState } from "react";
import Image from "next/image";
import { Box } from "lucide-react";
import ClientProduct from "@/components/3d/ClientProduct";

export default function ProductGallery({
    image,
    name,
    model,
}: {
    image: string;
    name: string;
    model?: string;
}) {
    const [show3D, setShow3D] = useState(false);

    return (
        <div className="relative h-[50vh] lg:h-[65vh] w-full bg-secondary rounded-xl overflow-hidden group">
            {show3D ? (
                <ClientProduct imageUrl={image} modelPath={model} />
            ) : (
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                    priority
                />
            )}

            <button
                onClick={() => setShow3D(!show3D)}
                className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm text-foreground px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-background transition-all shadow-lg z-10"
            >
                <Box size={16} />
                {show3D ? "Show Image" : "View in 3D"}
            </button>
        </div>
    );
}
