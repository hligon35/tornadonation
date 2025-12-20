import type {
  GameEvent,
  Product,
  Sponsor,
  Sport,
} from '@tornado-nation/shared';

const mockSports: Sport[] = [
  { id: 'football', name: 'Football', slug: 'football' },
  { id: 'basketball', name: 'Basketball', slug: 'basketball' },
  { id: 'baseball', name: 'Baseball', slug: 'baseball' },
  { id: 'soccer', name: 'Soccer', slug: 'soccer' },
  { id: 'volleyball', name: 'Volleyball', slug: 'volleyball' },
  { id: 'wrestling', name: 'Wrestling', slug: 'wrestling' },
];

function isoInDays(daysFromNow: number, hourLocal: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hourLocal, 0, 0, 0);
  return date.toISOString();
}

const mockEvents: GameEvent[] = [
  {
    id: 'event-football-1',
    title: 'Varsity Football vs Rivals',
    sportId: 'football',
    startTimeIso: isoInDays(0, 19),
    status: 'Scheduled',
    level: 'Varsity',
    locationName: 'Home Field',
  },
  {
    id: 'event-basketball-1',
    title: 'JV Basketball @ Central',
    sportId: 'basketball',
    startTimeIso: isoInDays(2, 18),
    status: 'Scheduled',
    level: 'JV',
    locationName: 'Central HS',
  },
  {
    id: 'event-baseball-1',
    title: 'Baseball Scrimmage',
    sportId: 'baseball',
    startTimeIso: isoInDays(5, 16),
    status: 'Scheduled',
    level: 'Varsity',
    locationName: 'Practice Field',
  },
];

const mockSponsors: Sponsor[] = [
  { id: 's-hero', name: 'Acme Auto', tier: 'Hero', websiteUrl: 'https://example.com', promoCode: 'TORNADO10' },
  { id: 's-ribbon', name: 'Main Street Pizza', tier: 'Ribbon', websiteUrl: 'https://example.com' },
  { id: 's-bumper', name: 'Community Bank', tier: 'Bumper', websiteUrl: 'https://example.com' },
];

const mockProducts: Product[] = [
  { id: 'tee', title: 'Tornado Tee', description: 'Soft cotton tee.', priceCents: 2500, currency: 'USD', inStock: true },
  { id: 'hat', title: 'Tornado Hat', description: 'Adjustable hat.', priceCents: 2000, currency: 'USD', inStock: true },
  { id: 'hoodie', title: 'Tornado Hoodie', description: 'Warm fleece hoodie.', priceCents: 4500, currency: 'USD', inStock: true },
  { id: 'sticker', title: 'Sticker Pack', description: 'Weatherproof stickers.', priceCents: 800, currency: 'USD', inStock: true },
];

async function listFromMock<T>(items: T[]): Promise<T[]> {
  // Keep it async so React Query behavior matches real API.
  return items;
}

async function getFromMockById<T extends { id: string }>(items: T[], id: string): Promise<T> {
  const match = items.find((item) => item.id === id);
  if (!match) throw new Error(`Not found: ${id}`);
  return match;
}

export const api = {
  listSports(): Promise<Sport[]> {
    return listFromMock(mockSports);
  },
  listEvents(): Promise<GameEvent[]> {
    return listFromMock(mockEvents);
  },
  getEvent(id: string): Promise<GameEvent> {
    return getFromMockById(mockEvents, id);
  },
  listSponsors(): Promise<Sponsor[]> {
    return listFromMock(mockSponsors);
  },
  listProducts(): Promise<Product[]> {
    return listFromMock(mockProducts);
  },
  getProduct(id: string): Promise<Product> {
    return getFromMockById(mockProducts, id);
  },
};
