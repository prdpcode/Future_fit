import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Shop — Oversized Tees, Round Neck Tees & Hoodies",
    description:
        "Browse the Future Fit collection. Oversized tees, round neck tees, and premium hoodies. AI-designed streetwear with free shipping.",
    openGraph: {
        title: "Shop — Future Fit Collection",
        description: "Browse oversized tees, round neck tees, and premium hoodies.",
    },
};

const PRODUCTS = [
    // Oversized Tees
    { id: "oversized-box-tee", name: "Oversized Box Tee", price: 1499, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", slug: "oversized-box-tee", category: "Oversized Tees" },
    { id: "oversized-acid-wash-tee", name: "Oversized Acid Wash Tee", price: 1699, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop", slug: "oversized-acid-wash-tee", category: "Oversized Tees" },
    { id: "oversized-graphic-tee", name: "Oversized Graphic Tee", price: 1599, image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop", slug: "oversized-graphic-tee", category: "Oversized Tees" },
    { id: "oversized-drop-shoulder-tee", name: "Oversized Drop Shoulder Tee", price: 1399, image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800&auto=format&fit=crop", slug: "oversized-drop-shoulder-tee", category: "Oversized Tees" },
    // Round Neck Tees
    { id: "classic-round-neck-tee", name: "Classic Round Neck Tee", price: 999, image: "https://images.unsplash.com/photo-1503341455253-b2e723099de5?q=80&w=800&auto=format&fit=crop", slug: "classic-round-neck-tee", category: "Round Neck Tees" },
    { id: "premium-round-neck-tee", name: "Premium Round Neck Tee", price: 1299, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop", slug: "premium-round-neck-tee", category: "Round Neck Tees" },
    { id: "round-neck-graphic-tee", name: "Round Neck Graphic Tee", price: 1199, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop", slug: "round-neck-graphic-tee", category: "Round Neck Tees" },
    // Hoodies
    { id: "oversized-hoodie", name: "Oversized Hoodie", price: 2999, image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop", slug: "oversized-hoodie", category: "Hoodies" },
    { id: "pullover-hoodie", name: "Pullover Hoodie", price: 2499, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop", slug: "pullover-hoodie", category: "Hoodies" },
    { id: "zip-up-hoodie", name: "Zip-Up Hoodie", price: 2799, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop", slug: "zip-up-hoodie", category: "Hoodies" },
];

export default function ShopPage() {
    return (
        <div>
            <div className="container mx-auto px-4 pt-12 pb-12">
                <div className="mb-10">
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-2">The Collection</p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter">COLLECTION 01</h1>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {PRODUCTS.map((product, index) => (
                        <Link
                            href={`/product/${product.slug}`}
                            key={product.id}
                            className="group animate-fade-up"
                            style={{ animationDelay: `${index * 80}ms` }}
                        >
                            <div className="aspect-[3/4] relative bg-secondary rounded-xl overflow-hidden mb-3 shadow-soft group-hover:shadow-soft-lg transition-all duration-500 group-hover:-translate-y-1">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    priority={index < 4}
                                    loading={index < 4 ? undefined : "lazy"}
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="flex justify-between items-start gap-2">
                                <div className="min-w-0">
                                    <h3 className="font-bold text-sm md:text-base leading-tight truncate">{product.name}</h3>
                                    <p className="text-muted-foreground text-xs mt-0.5">{product.category}</p>
                                </div>
                                <span className="font-bold text-sm shrink-0">{formatCurrency(product.price)}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
