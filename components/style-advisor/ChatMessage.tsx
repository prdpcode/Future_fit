import { cn } from "@/lib/utils";
import ProductCard from "@/components/style-advisor/ProductCard";
import type { AdvisorProduct } from "@/lib/style-advisor/types";

type Part = { type: string };
type TextPart = Part & { type: "text"; text: string };
type DataPart = Part & {
  type: "data";
  value?: { picks?: AdvisorProduct[] };
};

export default function ChatMessage({
  role,
  parts,
}: {
  role: "user" | "assistant";
  parts: readonly unknown[] | undefined;
}) {
  const isUser = role === "user";

  const safeParts = (parts ?? []).filter(
    (p): p is Part => typeof p === "object" && p != null && "type" in p,
  );

  const text = safeParts
    .filter((p): p is TextPart => p.type === "text" && "text" in p)
    .map((p) => p.text)
    .join("");

  const productsPart = safeParts.find(
    (p): p is DataPart => p.type === "data",
  );
  const picks = productsPart?.value?.picks ?? [];

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[44rem] rounded-2xl px-4 py-3 text-sm leading-6",
          isUser
            ? "bg-foreground text-background"
            : "bg-secondary text-secondary-foreground",
        )}
      >
        {text ? <div className="whitespace-pre-wrap">{text}</div> : null}

        {!isUser && picks.length ? (
          <div className="mt-3 grid gap-2">
            {picks.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
