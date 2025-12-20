import { z } from 'zod';

export const IdSchema = z.string().min(1);
export type Id = z.infer<typeof IdSchema>;

export const SportSchema = z.object({
  id: IdSchema,
  name: z.string().min(1),
  slug: z.string().min(1),
});
export type Sport = z.infer<typeof SportSchema>;

export const SeasonSchema = z.object({
  id: IdSchema,
  sportId: IdSchema,
  year: z.number().int().min(1900).max(2100),
  label: z.string().min(1),
});
export type Season = z.infer<typeof SeasonSchema>;

export const TeamSchema = z.object({
  id: IdSchema,
  sportId: IdSchema,
  seasonId: IdSchema,
  level: z.enum(['Varsity', 'JV']),
  name: z.string().min(1),
});
export type Team = z.infer<typeof TeamSchema>;

export const AthleteSchema = z.object({
  id: IdSchema,
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  displayName: z.string().min(1),
  sportIds: z.array(IdSchema),
  seasonIds: z.array(IdSchema),
  jerseyNumber: z.string().optional(),
  position: z.string().optional(),
  gradYear: z.number().int().optional(),
  guardianApproved: z.boolean().default(false),
});
export type Athlete = z.infer<typeof AthleteSchema>;

export const GameEventSchema = z.object({
  id: IdSchema,
  title: z.string().min(1),
  sportId: IdSchema,
  seasonId: IdSchema.optional(),
  level: z.enum(['Varsity', 'JV']).optional(),
  startTimeIso: z.string().min(1),
  locationName: z.string().optional(),
  address: z.string().optional(),
  homeTeamName: z.string().optional(),
  awayTeamName: z.string().optional(),
  status: z.enum(['Scheduled', 'Live', 'Final', 'Canceled']).default('Scheduled'),
});
export type GameEvent = z.infer<typeof GameEventSchema>;

export const SponsorSchema = z.object({
  id: IdSchema,
  name: z.string().min(1),
  tier: z.enum(['Hero', 'Ribbon', 'Takeover', 'Bumper']).optional(),
  websiteUrl: z.string().url().optional(),
  promoCode: z.string().optional(),
});
export type Sponsor = z.infer<typeof SponsorSchema>;

export const ProductSchema = z.object({
  id: IdSchema,
  title: z.string().min(1),
  description: z.string().optional(),
  priceCents: z.number().int().nonnegative(),
  currency: z.string().default('USD'),
  sku: z.string().optional(),
  inStock: z.boolean().default(true),
});
export type Product = z.infer<typeof ProductSchema>;

export const OrderDonationSchema = z.object({
  id: IdSchema,
  kind: z.enum(['Order', 'Donation']),
  createdAtIso: z.string().min(1),
  amountCents: z.number().int().nonnegative(),
  currency: z.string().default('USD'),
  status: z.enum(['Pending', 'Paid', 'Refunded', 'Canceled']).default('Pending'),
});
export type OrderDonation = z.infer<typeof OrderDonationSchema>;

export const RoleSchema = z.enum([
  'Admin',
  'AthleticStaff',
  'MediaTeam',
  'StoreManager',
  'Moderator',
  'Student',
]);
export type Role = z.infer<typeof RoleSchema>;
