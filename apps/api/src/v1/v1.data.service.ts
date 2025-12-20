import { Injectable } from '@nestjs/common';
import type {
  Athlete,
  GameEvent,
  OrderDonation,
  Product,
  Season,
  Sponsor,
  Sport,
  Team,
} from '@tornado-nation/shared';

import { InMemoryRepo } from './repo/in-memory-repo';

@Injectable()
export class V1DataService {
  readonly sports = new InMemoryRepo<Sport>([
    { id: 'football', name: 'Football', slug: 'football' },
    { id: 'basketball', name: 'Basketball', slug: 'basketball' },
    { id: 'baseball', name: 'Baseball', slug: 'baseball' },
  ]);

  readonly seasons = new InMemoryRepo<Season>([
    { id: 'football-2025', sportId: 'football', year: 2025, label: '2025' },
    { id: 'basketball-2025', sportId: 'basketball', year: 2025, label: '2025' },
  ]);

  readonly teams = new InMemoryRepo<Team>([
    {
      id: 'football-2025-varsity',
      sportId: 'football',
      seasonId: 'football-2025',
      level: 'Varsity',
      name: 'Tornado Nation Varsity Football',
    },
  ]);

  readonly athletes = new InMemoryRepo<Athlete>([
    {
      id: 'athlete-1',
      firstName: 'Jordan',
      lastName: 'Taylor',
      displayName: 'Jordan Taylor',
      sportIds: ['football'],
      seasonIds: ['football-2025'],
      guardianApproved: false,
    },
  ]);

  readonly events = new InMemoryRepo<GameEvent>([
    {
      id: 'event-1',
      title: 'Tornado Nation Game',
      sportId: 'football',
      seasonId: 'football-2025',
      level: 'Varsity',
      startTimeIso: new Date().toISOString(),
      locationName: 'Home Field',
      status: 'Scheduled',
    },
  ]);

  readonly sponsors = new InMemoryRepo<Sponsor>([
    {
      id: 'sponsor-1',
      name: 'Sponsor (Placeholder)',
      tier: 'Ribbon',
      promoCode: 'TORNADO10',
    },
  ]);

  readonly products = new InMemoryRepo<Product>([
    {
      id: 'tee',
      title: 'Tornado Tee',
      description: 'Official apparel (placeholder)',
      priceCents: 2500,
      currency: 'USD',
      sku: 'TEE-001',
      inStock: true,
    },
  ]);

  readonly ordersDonations = new InMemoryRepo<OrderDonation>([
    {
      id: 'od-1',
      kind: 'Donation',
      createdAtIso: new Date().toISOString(),
      amountCents: 1000,
      currency: 'USD',
      status: 'Paid',
    },
  ]);
}
