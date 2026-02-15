import type { Metadata } from "next";
import { formatCurrency } from "@/lib/utils";
import { PRODUCTS } from "@/lib/products";
import ProductGallery from "@/components/product/ProductGallery";
import ProductActions from "@/components/product/ProductActions";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const product = PRODUCTS[slug];
    if (!product) return { title: "Product Not Found" };

    return {
        title: `${product.name} — ₹${product.price}`,
        description: product.description,
        openGraph: {
            title: `${product.name} — Future Fit`,
            description: product.description,
            images: [{ url: product.image, width: 800, height: 800, alt: product.name }],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: product.name,
            description: product.description,
            images: [product.image],
        },
    };
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = PRODUCTS[slug];

    if (!product) return <div className="p-20 text-center">Product not found</div>;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.image,
        description: product.description,
        offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: "Future Fit" },
        },
    };

    return (
        <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="flex items-center min-h-[calc(100vh-4rem)]">
            <div className="container mx-auto px-4 py-4 lg:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Gallery */}
                    <ProductGallery
                        image={product.image}
                        name={product.name}
                        model={product.model}
                    />

                    {/* Info */}
                    <div className="flex flex-col justify-start space-y-8 pt-4 lg:pt-0">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-2">{product.name}</h1>
                            <p className="text-2xl font-bold">{formatCurrency(product.price)}</p>
                        </div>

                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {product.description}
                        </p>

                        <ProductActions product={product} />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
