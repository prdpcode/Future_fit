import type { WeatherNow } from "@/lib/style-advisor/types";

function readTemperatureC(json: unknown): number {
  if (typeof json !== "object" || json == null) return NaN;
  const current = (json as Record<string, unknown>).current;
  if (typeof current !== "object" || current == null) return NaN;
  const temperature = (current as Record<string, unknown>).temperature_2m;
  return typeof temperature === "number" ? temperature : Number(temperature);
}

export async function getCurrentWeatherByCoords(input: {
  lat: number;
  lon: number;
}): Promise<WeatherNow> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(input.lat));
  url.searchParams.set("longitude", String(input.lon));
  url.searchParams.set("current", "temperature_2m");

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Weather API failed: ${res.status}`);
  }

  const json: unknown = await res.json();
  const temperatureC = readTemperatureC(json);

  if (!Number.isFinite(temperatureC)) {
    throw new Error("Weather API returned invalid temperature");
  }

  return { temperatureC };
}
