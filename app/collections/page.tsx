import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Collections — Curated Streetwear Drops",
    description:
        "Explore curated Future Fit collections. Summer 2026, Core Essentials, Cyber Punk, Tech Fleece & more. Limited edition streetwear drops.",
    openGraph: {
        title: "Collections — Future Fit",
        description: "Explore curated streetwear collections and limited edition drops.",
    },
};



export default function CollectionsPage() {
    // Generated 15 collections
    const collections = [
        { id: 1, name: "Summer 2026", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop" },
        { id: 2, name: "Core Essentials", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop" },
        { id: 3, name: "Future Lab", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" },
        { id: 4, name: "Urban Utility", image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop" },
        { id: 5, name: "Neo-Sport", image: "https://images.unsplash.com/photo-1518049362260-bd50b5e47bf9?q=80&w=800&auto=format&fit=crop" },
        { id: 6, name: "Digital Nomad", image: "https://images.unsplash.com/photo-1529139574466-a302c27e3844?q=80&w=800&auto=format&fit=crop" },
        { id: 7, name: "Midnight Run", image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=800&auto=format&fit=crop" },
        { id: 8, name: "Acid Wash", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop" },
        { id: 9, name: "Tech Fleece", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop" },
        { id: 10, name: "Cyber Punk", image: "https://images.unsplash.com/photo-1536766820879-059fec98ec0a?q=80&w=800&auto=format&fit=crop" },
        { id: 11, name: "Vintage Rev", image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop" },
        { id: 12, name: "Monochrome", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop" },
        { id: 13, name: "Oversized", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop" },
        { id: 14, name: "Accessories", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop" },
        { id: 15, name: "Limited Ed", image: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=800&auto=format&fit=crop" },
    ];

    return (
        <div className="h-[calc(100vh-4rem)] overflow-y-auto no-scrollbar">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-black mb-8 tracking-tighter">COLLECTIONS</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20">
                    {collections.map((collection, index) => (
                        <Link href="/shop" key={collection.id} className="group relative aspect-[4/3] overflow-hidden rounded-lg animate-on-scroll">
                            <Image
                                src={collection.image}
                                alt={collection.name}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                priority={index < 4}
                                loading={index < 4 ? undefined : "lazy"}
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/50">
                                <h2 className="text-3xl font-bold text-white tracking-widest uppercase border-b-2 border-transparent group-hover:border-white transition-all">
                                    {collection.name}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
