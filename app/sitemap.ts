import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://wearfuturefit.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticPages: MetadataRoute.Sitemap = [
        { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
        { url: `${SITE_URL}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: `${SITE_URL}/collections`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${SITE_URL}/studio`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: `${SITE_URL}/fit-finder`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
        { url: `${SITE_URL}/refund-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
        { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
        { url: `${SITE_URL}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
        { url: `${SITE_URL}/register`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    ];

    const productPages: MetadataRoute.Sitemap = Object.keys(PRODUCTS).map((slug) => ({
        url: `${SITE_URL}/product/${slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [...staticPages, ...productPages];
}
