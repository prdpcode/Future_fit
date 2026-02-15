import type { MetadataRoute } from "next";

const baseUrl = "https://wearfuturefit.com";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/logout", "/checkout"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
