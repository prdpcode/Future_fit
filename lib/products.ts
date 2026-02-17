export type Size = "S" | "M" | "L" | "XL";

export type SizeChart = {
    chestCm: Record<Size, number>;
    lengthCm: Record<Size, number>;
};

export type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    slug: string;
    model?: string;
    sizeChart?: SizeChart;
};

export const PRODUCTS: Record<string, Product> = {
    // --- Oversized Tees ---
    "oversized-box-tee": {
        id: "oversized-box-tee",
        name: "Oversized Box Tee",
        price: 1499,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        description: "Engineered with a square, architectural silhouette. This 300gsm heavy-cotton piece features a high-density weave for a structured look that never sags. AI-modeled for the ultimate 'street-statue' aesthetic.",
        slug: "oversized-box-tee",
        sizeChart: {
            chestCm: { S: 112, M: 118, L: 124, XL: 130 },
            lengthCm: { S: 72, M: 74, L: 76, XL: 78 },
        },
    },
    "oversized-acid-wash-tee": {
        id: "oversized-acid-wash-tee",
        name: "Oversized Acid Wash Tee",
        price: 1699,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
        description: "A digital-age take on vintage textures. Each 280gsm tee undergoes a custom distress process to create a unique 'granite-shift' pattern. Features a dropped shoulder and reinforced neck ribbing for long-term durability.",
        slug: "oversized-acid-wash-tee",
        sizeChart: {
            chestCm: { S: 112, M: 118, L: 124, XL: 130 },
            lengthCm: { S: 72, M: 74, L: 76, XL: 78 },
        },
    },
    "oversized-graphic-tee": {
        id: "oversized-graphic-tee",
        name: "Oversized Graphic Tee",
        price: 1599,
        image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop",
        description: "The canvas for the future. Featuring high-definition screen prints of AI-generated cyberpunk motifs on 300gsm organic cotton. The extra-wide fit ensures the artwork remains undistorted, providing a premium visual profile.",
        slug: "oversized-graphic-tee",
        sizeChart: {
            chestCm: { S: 114, M: 120, L: 126, XL: 132 },
            lengthCm: { S: 74, M: 76, L: 78, XL: 80 },
        },
    },
    "oversized-drop-shoulder-tee": {
        id: "oversized-drop-shoulder-tee",
        name: "Oversized Drop Shoulder Tee",
        price: 1399,
        image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800&auto=format&fit=crop",
        description: "Maximum volume, zero bulk. Designed with an extended 260gsm combed cotton build to broaden the torso profile. Crafted for a heavy, premium drape that defines the modern street-ready silhouette.",
        slug: "oversized-drop-shoulder-tee",
        sizeChart: {
            chestCm: { S: 110, M: 116, L: 122, XL: 128 },
            lengthCm: { S: 70, M: 72, L: 74, XL: 76 },
        },
    },

    // --- Round Neck Tees ---
    "classic-round-neck-tee": {
        id: "classic-round-neck-tee",
        name: "Classic Round Neck Tee",
        price: 999,
        image: "https://images.unsplash.com/photo-1503341455253-b2e723099de5?q=80&w=800&auto=format&fit=crop",
        description: "The base layer of the digital nomad. A streamlined 180gsm ring-spun cotton build that transitions perfectly from the studio to the street. Features a signature ribbed collar and an essential crew neck fit.",
        slug: "classic-round-neck-tee",
        sizeChart: {
            chestCm: { S: 96, M: 102, L: 108, XL: 114 },
            lengthCm: { S: 68, M: 70, L: 72, XL: 74 },
        },
    },
    "premium-round-neck-tee": {
        id: "premium-round-neck-tee",
        name: "Premium Round Neck Tee",
        price: 1299,
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop",
        description: "Luxury 220gsm Pima cotton meets reinforced seams. This piece features a tailored fit with a silky hand-feel, designed to maintain its shape through a thousand wear-cycles in any urban environment.",
        slug: "premium-round-neck-tee",
        sizeChart: {
            chestCm: { S: 98, M: 104, L: 110, XL: 116 },
            lengthCm: { S: 69, M: 71, L: 73, XL: 75 },
        },
    },
    "round-neck-graphic-tee": {
        id: "round-neck-graphic-tee",
        name: "Round Neck Graphic Tee",
        price: 1199,
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
        description: "Minimalist aesthetic meets bold AI iconography. A 200gsm organic cotton silhouette featuring subtle futuristic chest prints. Ideal for those who prefer a clean, fitted look with a touch of tech-noir edge.",
        slug: "round-neck-graphic-tee",
        sizeChart: {
            chestCm: { S: 96, M: 102, L: 108, XL: 114 },
            lengthCm: { S: 68, M: 70, L: 72, XL: 74 },
        },
    },
    // --- Hoodies ---
    "oversized-hoodie": {
        id: "oversized-hoodie",
        name: "Oversized Hoodie",
        price: 2999,
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop",
        description: "Your personal sanctuary. A heavyweight 500gsm French Terry hoodie with an extra-large 'cyber-hood' and dropped sleeves. Designed to provide a cocoon-like fit without sacrificing mobility.",
        slug: "oversized-hoodie",
        sizeChart: {
            chestCm: { S: 118, M: 124, L: 130, XL: 136 },
            lengthCm: { S: 70, M: 72, L: 74, XL: 76 },
        },
    },
    "pullover-hoodie": {
        id: "pullover-hoodie",
        name: "Pullover Hoodie",
        price: 2499,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
        description: "The daily driver for the future-focused. Features 400gsm brushed fleece, a streamlined kangaroo pocket, and hidden utility loops. The structured fit makes it the most versatile mid-layer in the collection.",
        slug: "pullover-hoodie",
        sizeChart: {
            chestCm: { S: 108, M: 114, L: 120, XL: 126 },
            lengthCm: { S: 66, M: 68, L: 70, XL: 72 },
        },
    },
    "zip-up-hoodie": {
        id: "zip-up-hoodie",
        name: "Zip-Up Hoodie",
        price: 2799,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
        description: "Technical versatility. Featuring a high-quality 420gsm cotton-poly blend and a matte black full-zip front. Perfect for temperature control in shifting urban climates while maintaining a sleek profile.",
        slug: "zip-up-hoodie",
        sizeChart: {
            chestCm: { S: 106, M: 112, L: 118, XL: 124 },
            lengthCm: { S: 66, M: 68, L: 70, XL: 72 },
        },
    },
};
