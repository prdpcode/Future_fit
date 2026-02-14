import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

const PRODUCTS = [
    {
        id: "heavyweight-tee",
        name: "Heavyweight Box Tee",
        price: 1499,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        slug: "heavyweight-tee",
    },
    {
        id: "oversized-hoodie",
        name: "Oversized Hoodie",
        price: 3499,
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop",
        slug: "oversized-hoodie",
    },
    {
        id: "crop-tee",
        name: "Women's Crop Tee",
        price: 999,
        image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800&auto=format&fit=crop",
        slug: "crop-tee",
    },
    {
        id: "urban-bomber",
        name: "Urban Bomber Jacket",
        price: 4999,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
        slug: "urban-bomber",
    },
    {
        id: "tech-joggers",
        name: "Tech Fleece Joggers",
        price: 2499,
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
        slug: "tech-joggers",
    },
    {
        id: "performance-tank",
        name: "Performance Tank",
        price: 899,
        image: "https://images.unsplash.com/photo-1503341455253-b2e723099de5?q=80&w=800&auto=format&fit=crop",
        slug: "performance-tank",
    },
    {
        id: "graphic-tee-v1",
        name: "Graphic Tee V1",
        price: 1299,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
        slug: "graphic-tee-v1",
    },
    {
        id: "graphic-tee-v2",
        name: "Graphic Tee V2",
        price: 1299,
        image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop",
        slug: "graphic-tee-v2",
    },
    {
        id: "essentials-cap",
        name: "Essentials Cap",
        price: 799,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop",
        slug: "essentials-cap",
    },
    {
        id: "canvas-tote",
        name: "Canvas Tote Bag",
        price: 599,
        image: "https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?q=80&w=800&auto=format&fit=crop",
        slug: "canvas-tote",
    },
    {
        id: "mesh-shorts",
        name: "Mesh Gym Shorts",
        price: 1199,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop",
        slug: "mesh-shorts",
    },
    {
        id: "quarter-zip",
        name: "Quarter Zip Pullover",
        price: 2999,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
        slug: "quarter-zip",
    },
    {
        id: "windbreaker",
        name: "Lightweight Windbreaker",
        price: 3999,
        image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop",
        slug: "windbreaker",
    },
    {
        id: "bucket-hat",
        name: "Nylon Bucket Hat",
        price: 999,
        image: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=800&auto=format&fit=crop",
        slug: "bucket-hat",
    },
    {
        id: "socks-pack",
        name: "Performance Socks (3-Pack)",
        price: 499,
        image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=800&auto=format&fit=crop",
        slug: "socks-pack",
    },
    {
        id: "cyber-visor",
        name: "Cyber Visor",
        price: 3499,
        image: "https://images.unsplash.com/photo-1544211059-4d6d03d328b9?q=80&w=800&auto=format&fit=crop",
        slug: "cyber-visor",
    },
    {
        id: "tactical-vest",
        name: "Tactical Vest",
        price: 5999,
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
        slug: "tactical-vest",
    },
    {
        id: "cargo-pants",
        name: "Tech Cargo Pants",
        price: 4499,
        image: "https://images.unsplash.com/photo-1551488852-d81a2d54005b?q=80&w=800&auto=format&fit=crop",
        slug: "cargo-pants",
    },
    {
        id: "neoprene-jacket",
        name: "Neoprene Jacket",
        price: 7999,
        image: "https://images.unsplash.com/photo-1534030347209-467a5b0dd3e6?q=80&w=800&auto=format&fit=crop",
        slug: "neoprene-jacket",
    },
    {
        id: "cyber-boots",
        name: "Cyber Boots",
        price: 12999,
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop",
        slug: "cyber-boots",
    },
    {
        id: "tech-mask",
        name: "Tech Face Mask",
        price: 999,
        image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800&auto=format&fit=crop",
        slug: "tech-mask",
    },
    {
        id: "holo-backpack",
        name: "Holographic Backpack",
        price: 6499,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
        slug: "holo-backpack",
    },
    {
        id: "led-sneakers",
        name: "LED High-Tops",
        price: 8999,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
        slug: "led-sneakers",
    },
    {
        id: "smart-watch",
        name: "Neural Link Watch",
        price: 15499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
        slug: "smart-watch",
    },
    {
        id: "drone-controller",
        name: "Drone Controller Gloves",
        price: 2499,
        image: "https://images.unsplash.com/photo-1591543620762-b28669b35b6a?q=80&w=800&auto=format&fit=crop",
        slug: "drone-controller",
    },
];

export default function ShopPage() {
    return (
        <div className="h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-black mb-8 tracking-tighter">COLLECTION 01</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {PRODUCTS.map((product) => (
                        <Link href={`/product/${product.slug}`} key={product.id} className="group animate-on-scroll">
                            <div className="aspect-[3/4] relative bg-secondary rounded-lg overflow-hidden mb-2">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">{product.name}</h3>
                                    <p className="text-muted-foreground text-sm">Future Fit Standard</p>
                                </div>
                                <span className="font-semibold">{formatCurrency(product.price)}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
