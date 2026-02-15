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
    model?: string;
    sizeChart?: SizeChart;
};

export const PRODUCTS: Record<string, Product> = {
    "heavyweight-tee": {
        id: "heavyweight-tee",
        name: "Heavyweight Box Tee",
        price: 1499,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        description: "300gsm cotton jersey. Boxy fit. Drop shoulders. Pre-shrunk.",
        sizeChart: {
            chestCm: { S: 102, M: 108, L: 114, XL: 120 },
            lengthCm: { S: 70, M: 72, L: 74, XL: 76 },
        },
    },
    "oversized-hoodie": {
        id: "oversized-hoodie",
        name: "Oversized Hoodie",
        price: 3499,
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop",
        description: "500gsm french terry. Kangaroo pocket. Double-lined hood.",
        sizeChart: {
            chestCm: { S: 112, M: 118, L: 124, XL: 130 },
            lengthCm: { S: 68, M: 70, L: 72, XL: 74 },
        },
    },
    "crop-tee": {
        id: "crop-tee",
        name: "Women's Crop Tee",
        price: 999,
        image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800&auto=format&fit=crop",
        description: "Mid-weight cotton. Cropped tailored fit.",
        sizeChart: {
            chestCm: { S: 92, M: 98, L: 104, XL: 110 },
            lengthCm: { S: 46, M: 48, L: 50, XL: 52 },
        },
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
