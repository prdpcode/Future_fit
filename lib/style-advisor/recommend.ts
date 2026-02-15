import type { AdvisorProduct } from "@/lib/style-advisor/types";

export function recommendProducts(input: {
  temperatureC: number;
  products: AdvisorProduct[];
}): {
  reasoning: string;
  picks: AdvisorProduct[];
} {
  const { temperatureC, products } = input;

  const hoodies = products.filter((p) => (p.category ?? "").includes("hood"));
  const tees = products.filter((p) =>
    ["tee", "tshirt", "t-shirt"].some((k) => (p.category ?? "").includes(k)),
  );

  const byGsmDesc = (a: AdvisorProduct, b: AdvisorProduct) =>
    (b.gsm ?? 0) - (a.gsm ?? 0);
  const byGsmAsc = (a: AdvisorProduct, b: AdvisorProduct) =>
    (a.gsm ?? 9999) - (b.gsm ?? 9999);

  const cold = temperatureC <= 18;
  const warm = temperatureC >= 28;

  if (cold) {
    const picks = [...hoodies].sort(byGsmDesc).slice(0, 3);
    return {
      reasoning: `It’s ${Math.round(temperatureC)}°C right now — cold enough that a heavyweight layer will feel best. I’m prioritizing 450+ GSM hoodies.`,
      picks,
    };
  }

  if (warm) {
    const picks = [...tees].sort(byGsmAsc).slice(0, 3);
    return {
      reasoning: `It’s ${Math.round(temperatureC)}°C right now — warm weather. I’m prioritizing breathable lightweight tees.`,
      picks,
    };
  }

  const midPicks = [...tees].sort(byGsmDesc).slice(0, 2);
  const midHoodie = [...hoodies].sort(byGsmAsc).slice(0, 1);
  const picks = [...midPicks, ...midHoodie].slice(0, 3);

  return {
    reasoning: `It’s ${Math.round(temperatureC)}°C — mild. A midweight tee + an optional light hoodie gives you the most flexibility.`,
    picks,
  };
}
