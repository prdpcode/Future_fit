"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Wand2, Box } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import ClientProduct from "@/components/3d/ClientProduct";
import { formatCurrency } from "@/lib/utils";
import BodyScanner from "@/components/sizing/BodyScanner";
import { Ruler } from "lucide-react";

// Mock data - in real app fetch based on slug
const PRODUCTS: Record<string, any> = {
    "heavyweight-tee": {
        id: "heavyweight-tee",
        name: "Heavyweight Box Tee",
        price: 1499,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        description: "300gsm cotton jersey. Boxy fit. Drop shoulders. Pre-shrunk.",
    },
    "oversized-hoodie": {
        id: "oversized-hoodie",
        name: "Oversized Hoodie",
        price: 3499,
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop",
        description: "500gsm french terry. Kangaroo pocket. Double-lined hood.",
    },
    "crop-tee": {
        id: "crop-tee",
        name: "Women's Crop Tee",
        price: 999,
        image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800&auto=format&fit=crop",
        description: "Mid-weight cotton. Cropped tailored fit.",
    },
    "urban-bomber": {
        id: "urban-bomber",
        name: "Urban Bomber Jacket",
        price: 4999,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
        description: "Classic flight jacket silhouette. Water-resistant nylon shell. Orange lining.",
    },
    "tech-joggers": {
        id: "tech-joggers",
        name: "Tech Fleece Joggers",
        price: 2499,
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
        description: "Tapered fit. Tech fleece construction for lightweight warmth. Zippered pockets.",
    },
    "performance-tank": {
        id: "performance-tank",
        name: "Performance Tank",
        price: 899,
        image: "https://images.unsplash.com/photo-1503341455253-b2e723099de5?q=80&w=800&auto=format&fit=crop",
        description: "Moisture-wicking fabric. Racerback design. Breathable mesh panels.",
    },
    "graphic-tee-v1": {
        id: "graphic-tee-v1",
        name: "Graphic Tee V1",
        price: 1299,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
        description: "Limited edition graphic print. 100% organic cotton. Standard fit.",
    },
    "graphic-tee-v2": {
        id: "graphic-tee-v2",
        name: "Graphic Tee V2",
        price: 1299,
        image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop",
        description: "Abstract digital print. Soft washed cotton. Ribbed neck.",
    },
    "essentials-cap": {
        id: "essentials-cap",
        name: "Essentials Cap",
        price: 799,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop",
        description: "6-panel dad hat. Adjustable strap. Embroidered logo.",
    },
    "canvas-tote": {
        id: "canvas-tote",
        name: "Canvas Tote Bag",
        price: 599,
        image: "https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?q=80&w=800&auto=format&fit=crop",
        description: "Heavy duty canvas. Reinforced handles. Inner pocket.",
    },
    "mesh-shorts": {
        id: "mesh-shorts",
        name: "Mesh Gym Shorts",
        price: 1199,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop",
        description: "Double layer mesh. Elastic waistband with drawcord. Above knee cut.",
    },
    "quarter-zip": {
        id: "quarter-zip",
        name: "Quarter Zip Pullover",
        price: 2999,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
        description: "Performance mid-layer. Stand collar. Thumb holes.",
    },
    "windbreaker": {
        id: "windbreaker",
        name: "Lightweight Windbreaker",
        price: 3999,
        image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop",
        description: "Packable windbreaker. Hood with toggles. Elastic cuffs.",
    },
    "bucket-hat": {
        id: "bucket-hat",
        name: "Nylon Bucket Hat",
        price: 999,
        image: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=800&auto=format&fit=crop",
        description: "Wide brim. Nylon fabric. Sweatband.",
    },
    "socks-pack": {
        id: "socks-pack",
        name: "Performance Socks (3-Pack)",
        price: 499,
        image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=800&auto=format&fit=crop",
        description: "Cushioned sole. Arch support. Breathable zones.",
    },
};

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const { addItem } = useCart();
    const [show3D, setShow3D] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const slug = params.slug as string;
    const product = PRODUCTS[slug];

    if (!product) return <div className="p-20 text-center">Product not found</div>;

    const handleAddToCart = () => {
        addItem({ ...product, customized: false });
    };

    const handleCustomize = () => {
        const query = new URLSearchParams({
            bg: product.image,
            id: product.id,
        }).toString();
        router.push(`/studio?${query}`);
    };

    return (
        <div className="h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar flex items-center">
            <div className="container mx-auto px-4 py-4 lg:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Gallery */}
                    <div className="relative h-[50vh] lg:h-[65vh] w-full bg-secondary rounded-xl overflow-hidden group">
                        {show3D ? (
                            <ClientProduct imageUrl={product.image} modelPath={product.model} />
                        ) : (
                            <Image
                                src={product.image}
                                alt={product.name}
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

                    {/* Info */}
                    <div className="flex flex-col justify-start space-y-8 pt-4 lg:pt-0">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-2">{product.name}</h1>
                            <p className="text-2xl font-bold">{formatCurrency(product.price)}</p>
                        </div>

                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {product.description}
                        </p>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="w-full py-4 bg-secondary text-secondary-foreground rounded-full font-bold flex items-center justify-center gap-2 hover:bg-muted transition-colors"
                            >
                                <ShoppingBag size={20} />
                                Add to Cart
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

                        {/* Size Finder */}
                        <button
                            onClick={() => setShowScanner(true)}
                            className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                        >
                            <div className="p-2 bg-secondary rounded-full group-hover:bg-muted transition-colors">
                                <Ruler size={16} />
                            </div>
                            <span className="underline decoration-dotted underline-offset-4">Not sure about your size? Use AI Body Scanner</span>
                        </button>
                    </div>
                </div>
            </div>

            <BodyScanner
                isOpen={showScanner}
                onClose={() => setShowScanner(false)}
                onComplete={(size) => {
                    alert(`Recommended Size: ${size}`);
                    setShowScanner(false);
                }}
            />
        </div>
    );
}
