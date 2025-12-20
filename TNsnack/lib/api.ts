import type {
  GameEvent,
  Product,
  Sponsor,
  Sport,
} from '@tornado-nation/shared';

const baseUrl = (process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  '',
);

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`API ${res.status} for ${path}`);
  }
  return (await res.json()) as T;
}

export const api = {
  listSports(): Promise<Sport[]> {
    return getJson('/v1/sports');
  },
  listEvents(): Promise<GameEvent[]> {
    return getJson('/v1/events');
  },
  getEvent(id: string): Promise<GameEvent> {
    return getJson(`/v1/events/${encodeURIComponent(id)}`);
  },
  listSponsors(): Promise<Sponsor[]> {
    return getJson('/v1/sponsors');
  },
  listProducts(): Promise<Product[]> {
    return getJson('/v1/products');
  },
  getProduct(id: string): Promise<Product> {
    return getJson(`/v1/products/${encodeURIComponent(id)}`);
  },
};
