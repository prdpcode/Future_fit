export type AdvisorProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  gsm?: number | null;
  category?: string | null;
};

export type WeatherNow = {
  temperatureC: number;
};
