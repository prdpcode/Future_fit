import type { AdvisorProduct } from "@/lib/style-advisor/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const FALLBACK_PRODUCTS: AdvisorProduct[] = [
  {
    id: "ff-450gsm-hoodie-black",
    name: "Future Fit 450 GSM Hoodie (Black)",
    slug: "oversized-hoodie",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop",
    gsm: 450,
    category: "hoodie",
  },
  {
    id: "ff-300gsm-tee",
    name: "Future Fit 300 GSM Box Tee",
    slug: "heavyweight-tee",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    gsm: 300,
    category: "tshirt",
  },
  {
    id: "ff-light-tee",
    name: "Future Fit Lightweight Tee",
    slug: "graphic-tee-v1",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
    gsm: 180,
    category: "tshirt",
  },
];

function normalizeProductUnknown(row: unknown): AdvisorProduct {
  const r = (row ?? {}) as Record<string, unknown>;
  return {
    id: String(r.id),
    name: String(r.name ?? r.title ?? "Future Fit"),
    slug: String(r.slug ?? r.handle ?? r.id),
    price: Number(r.price ?? r.mrp ?? 0),
    image: String(r.image ?? r.image_url ?? r.thumbnail ?? ""),
    gsm: r.gsm == null ? null : Number(r.gsm),
    category: r.category == null ? null : String(r.category),
  };
}

export async function getProductsForAdvisor(): Promise<AdvisorProduct[]> {
  const supabase = createSupabaseServerClient();
  if (!supabase) return FALLBACK_PRODUCTS;

  const { data, error } = await supabase
    .from("products")
    .select("id,name,slug,price,image,gsm,category")
    .limit(50);

  if (error || !data) return FALLBACK_PRODUCTS;

  const normalized = data
    .map((row: unknown) => normalizeProductUnknown(row))
    .filter((p) => Boolean(p.image) && Boolean(p.slug));

  return normalized.length ? normalized : FALLBACK_PRODUCTS;
}
