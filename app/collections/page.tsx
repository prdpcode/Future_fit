import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Collections — Oversized Tees, Round Neck Tees & Hoodies",
    description:
        "Explore Future Fit collections. Premium oversized tees, classic round neck tees, and cozy hoodies.",
    openGraph: {
        title: "Collections — Future Fit",
        description: "Explore premium oversized tees, round neck tees, and hoodies.",
    },
};

export default function CollectionsPage() {
    const collections = [
        { id: 1, name: "Oversized Tees", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop" },
        { id: 2, name: "Round Neck Tees", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop" },
        { id: 3, name: "Hoodies", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop" },
    ];

    return (
        <div>
            <div className="container mx-auto px-4 pt-12 pb-8">
                <h1 className="text-4xl font-black mb-8 tracking-tighter">COLLECTIONS</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {collections.map((collection) => (
                        <Link href="/shop" key={collection.id} className="group relative aspect-[4/3] overflow-hidden rounded-lg animate-on-scroll">
                            <Image
                                src={collection.image}
                                alt={collection.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                priority
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
