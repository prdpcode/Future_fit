"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ShoppingBag, Wand2, Ruler } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import type { Product } from "@/lib/products";

const VirtualFittingRoom = dynamic(
    () => import("@/components/fitting/VirtualFittingRoom"),
    { ssr: false },
);

export default function ProductActions({ product }: { product: Product }) {
    const router = useRouter();
    const { addItem } = useCart();
    const [showFitting, setShowFitting] = useState(false);

    const storageKey = useMemo(() => `future-fit-size:${product.id}`, [product.id]);

    const [selectedSize, setSelectedSize] = useState<string | null>(() => {
        if (typeof window === "undefined") return null;
        return window.localStorage.getItem(storageKey);
    });

    const handleAddToCart = () => {
        addItem({ ...product, customized: false, size: selectedSize ?? undefined });
    };

    const handleCustomize = () => {
        const query = new URLSearchParams({
            bg: product.image,
            id: product.id,
        }).toString();
        router.push(`/studio?${query}`);
    };

    return (
        <>
            <div className="flex flex-col gap-4">
                <button
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-secondary text-secondary-foreground rounded-full font-bold flex items-center justify-center gap-2 hover:bg-muted transition-colors"
                >
                    <ShoppingBag size={20} />
                    Add to Cart
                </button>

                <button
                    onClick={() => setShowFitting(true)}
                    className="w-full py-4 bg-foreground text-background rounded-full font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    <Ruler size={20} />
                    Virtual Fit
                </button>

                <button
                    onClick={handleCustomize}
                    className="w-full py-4 bg-foreground text-background rounded-full font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    <Wand2 size={20} />
                    Customize in Studio
                </button>
                <p className="text-xs text-center text-muted-foreground">
                    Customize this piece with AI-generated art and custom typography.
                </p>
            </div>

            <button
                onClick={() => setShowFitting(true)}
                className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
                <div className="p-2 bg-secondary rounded-full group-hover:bg-muted transition-colors">
                    <Ruler size={16} />
                </div>
                <span className="underline decoration-dotted underline-offset-4">Not sure about your size? Try Virtual Fit</span>
            </button>

            {showFitting ? (
                <VirtualFittingRoom
                    isOpen={showFitting}
                    onClose={() => setShowFitting(false)}
                    productId={product.id}
                    productName={product.name}
                    sizeChart={product.sizeChart}
                    onSelectedSizeChange={(size) => {
                        setSelectedSize(size);
                        if (typeof window === "undefined") return;
                        if (size) window.localStorage.setItem(storageKey, size);
                        else window.localStorage.removeItem(storageKey);
                    }}
                />
            ) : null}
        </>
    );
}
