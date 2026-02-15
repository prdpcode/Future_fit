import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://futurefit.ai";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/logout", "/checkout"],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
