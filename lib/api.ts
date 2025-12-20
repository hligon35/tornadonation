import type {
  GameEvent,
  Product,
  Season,
  Sponsor,
  Sport,
} from '@tornado-nation/shared';

type Rng = {
  next01: () => number;
  int: (minInclusive: number, maxInclusive: number) => number;
  pick: <T>(items: T[]) => T;
};

function makeRng(seed: number): Rng {
  // Xorshift32 (deterministic, fast, no deps)
  let x = (seed | 0) || 123456789;
  const next01 = () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    // Convert to [0, 1)
    return ((x >>> 0) & 0xffffffff) / 0x100000000;
  };
  const int = (minInclusive: number, maxInclusive: number) => {
    const span = Math.max(1, maxInclusive - minInclusive + 1);
    return minInclusive + Math.floor(next01() * span);
  };
  const pick = <T,>(items: T[]) => items[Math.max(0, Math.min(items.length - 1, int(0, items.length - 1)))]!;
  return { next01, int, pick };
}

const mockSports: Sport[] = [
  { id: 'football', name: 'Football', slug: 'football' },
  { id: 'basketball', name: 'Basketball', slug: 'basketball' },
  { id: 'baseball', name: 'Baseball', slug: 'baseball' },
  { id: 'soccer', name: 'Soccer', slug: 'soccer' },
  { id: 'volleyball', name: 'Volleyball', slug: 'volleyball' },
  { id: 'wrestling', name: 'Wrestling', slug: 'wrestling' },
  { id: 'track', name: 'Track & Field', slug: 'track' },
  { id: 'softball', name: 'Softball', slug: 'softball' },
  { id: 'golf', name: 'Golf', slug: 'golf' },
  { id: 'tennis', name: 'Tennis', slug: 'tennis' },
  { id: 'cheer', name: 'Cheer', slug: 'cheer' },
];

const sportNameById = new Map(mockSports.map((s) => [s.id, s.name] as const));

function isoInDays(daysFromNow: number, hourLocal: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hourLocal, 0, 0, 0);
  return date.toISOString();
}

function isoLocal(args: { year: number; monthIndex: number; day: number; hourLocal: number }) {
  const date = new Date(args.year, args.monthIndex, args.day, args.hourLocal, 0, 0, 0);
  return date.toISOString();
}

function statusForStartTime(startTimeIso: string): GameEvent['status'] {
  const start = new Date(startTimeIso).getTime();
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;
  const oneDay = 24 * oneHour;
  if (start < now - oneDay) return 'Final';
  if (start >= now - oneHour && start <= now + 2 * oneHour) return 'Live';
  return 'Scheduled';
}

const opponentNames = [
  'Central',
  'Eastview',
  'Westfield',
  'North Ridge',
  'South Valley',
  'Lakeside',
  'Pinecrest',
  'Riverview',
  'Heritage',
  'Lincoln',
];

const sportMonthsById: Record<string, number[]> = {
  football: [7, 8, 9, 10],
  soccer: [7, 8, 9],
  volleyball: [7, 8, 9],
  basketball: [11, 0, 1],
  wrestling: [11, 0, 1],
  baseball: [2, 3, 4],
  softball: [2, 3, 4],
  track: [2, 3, 4],
  golf: [2, 3, 4],
  tennis: [2, 3, 4],
  cheer: [7, 8, 9, 10, 11],
};

const now = new Date();
const currentYear = now.getFullYear();
const startYear = currentYear - 4;
const years = Array.from({ length: 5 }, (_, idx) => startYear + idx);

const mockSeasons: Season[] = years.flatMap((year) =>
  mockSports.map((sport) => ({
    id: `season-${sport.id}-${year}`,
    sportId: sport.id,
    year,
    label: `${year} Season`,
  })),
);

const mockEvents: GameEvent[] = (() => {
  const rng = makeRng(20250101);
  const events: GameEvent[] = [];

  for (const year of years) {
    for (const sport of mockSports) {
      const months = sportMonthsById[sport.id] ?? [8, 9, 10];
      const eventsPerSeason = 10;
      for (let i = 0; i < eventsPerSeason; i += 1) {
        const monthIndex = rng.pick(months);
        const day = rng.int(1, 26);
        const hourLocal = rng.pick([16, 17, 18, 19]);
        const level = rng.pick(['Varsity', 'JV'] as const);
        const isHome = rng.next01() > 0.45;
        const opponent = rng.pick(opponentNames);

        const startTimeIso = isoLocal({ year, monthIndex, day, hourLocal });
        const sportName = sportNameById.get(sport.id) ?? sport.id;

        events.push({
          id: `event-${sport.id}-${year}-${String(i + 1).padStart(2, '0')}`,
          title: `${level} ${sportName} ${isHome ? 'vs' : '@'} ${opponent}`,
          sportId: sport.id,
          seasonId: `season-${sport.id}-${year}`,
          level,
          startTimeIso,
          status: statusForStartTime(startTimeIso),
          locationName: isHome ? 'Home Campus' : `${opponent} HS`,
          homeTeamName: isHome ? 'Tornado Nation' : opponent,
          awayTeamName: isHome ? opponent : 'Tornado Nation',
        });
      }
    }
  }

  // Ensure there are always a few events visible in "today" / "this week" views.
  events.push(
    {
      id: 'event-featured-today',
      title: 'Varsity Football vs Rivals (Featured)',
      sportId: 'football',
      seasonId: `season-football-${currentYear}`,
      startTimeIso: isoInDays(0, 19),
      status: statusForStartTime(isoInDays(0, 19)),
      level: 'Varsity',
      locationName: 'Home Field',
      homeTeamName: 'Tornado Nation',
      awayTeamName: 'Rivals',
    },
    {
      id: 'event-featured-weekend',
      title: 'JV Basketball @ Central (Featured)',
      sportId: 'basketball',
      seasonId: `season-basketball-${currentYear}`,
      startTimeIso: isoInDays(2, 18),
      status: statusForStartTime(isoInDays(2, 18)),
      level: 'JV',
      locationName: 'Central HS',
      homeTeamName: 'Central',
      awayTeamName: 'Tornado Nation',
    },
  );

  return events;
})();

const mockSponsors: Sponsor[] = [
  { id: 's-hero', name: 'Acme Auto', tier: 'Hero', websiteUrl: 'https://example.com', promoCode: 'TORNADO10' },
  { id: 's-takeover', name: 'Regional Health', tier: 'Takeover', websiteUrl: 'https://example.com', promoCode: 'FAMILY' },
  { id: 's-ribbon', name: 'Main Street Pizza', tier: 'Ribbon', websiteUrl: 'https://example.com' },
  { id: 's-bumper', name: 'Community Bank', tier: 'Bumper', websiteUrl: 'https://example.com' },
  { id: 's-bumper-2', name: 'Tornado Print Co.', tier: 'Bumper', websiteUrl: 'https://example.com' },
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
  // Not currently used by screens, but available for demo/expansion.
  listSeasons(): Promise<Season[]> {
    return listFromMock(mockSeasons);
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
