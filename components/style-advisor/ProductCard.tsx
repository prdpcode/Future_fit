import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import type { AdvisorProduct } from "@/lib/style-advisor/types";

export default function ProductCard({ product }: { product: AdvisorProduct }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex gap-3 rounded-xl border border-border bg-background/60 p-3 hover:bg-background transition-colors"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate font-bold leading-5">{product.name}</div>
            <div className="text-xs text-muted-foreground">
              {product.gsm ? `${product.gsm} GSM` : "Future Fit"}
            </div>
          </div>
          <div className="shrink-0 text-sm font-semibold">
            {formatCurrency(product.price)}
          </div>
        </div>
      </div>
    </Link>
  );
}
