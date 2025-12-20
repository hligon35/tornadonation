import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum TeamLevel {
  Varsity = 'Varsity',
  JV = 'JV',
}

export enum EventStatus {
  Scheduled = 'Scheduled',
  Live = 'Live',
  Final = 'Final',
  Canceled = 'Canceled',
}

export enum SponsorTier {
  Hero = 'Hero',
  Ribbon = 'Ribbon',
  Takeover = 'Takeover',
  Bumper = 'Bumper',
}

export enum OrderDonationKind {
  Order = 'Order',
  Donation = 'Donation',
}

export enum OrderDonationStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  Refunded = 'Refunded',
  Canceled = 'Canceled',
}

registerEnumType(TeamLevel, { name: 'TeamLevel' });
registerEnumType(EventStatus, { name: 'EventStatus' });
registerEnumType(SponsorTier, { name: 'SponsorTier' });
registerEnumType(OrderDonationKind, { name: 'OrderDonationKind' });
registerEnumType(OrderDonationStatus, { name: 'OrderDonationStatus' });

@ObjectType()
export class SportGql {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  slug!: string;
}

@InputType()
export class SportInput {
  @Field()
  name!: string;

  @Field()
  slug!: string;
}

@ObjectType()
export class SeasonGql {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  sportId!: string;

  @Field(() => Int)
  year!: number;

  @Field()
  label!: string;
}

@InputType()
export class SeasonInput {
  @Field(() => ID)
  sportId!: string;

  @Field(() => Int)
  year!: number;

  @Field({ nullable: true })
  label?: string;
}

@ObjectType()
export class TeamGql {
  @Field(() => ID)
  id!: string;

  @Field(() => ID)
  sportId!: string;

  @Field(() => ID)
  seasonId!: string;

  @Field(() => TeamLevel)
  level!: TeamLevel;

  @Field()
  name!: string;
}

@InputType()
export class TeamInput {
  @Field(() => ID)
  sportId!: string;

  @Field(() => ID)
  seasonId!: string;

  @Field(() => TeamLevel)
  level!: TeamLevel;

  @Field()
  name!: string;
}

@ObjectType()
export class AthleteGql {
  @Field(() => ID)
  id!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  displayName!: string;

  @Field(() => [ID])
  sportIds!: string[];

  @Field(() => [ID])
  seasonIds!: string[];

  @Field({ nullable: true })
  jerseyNumber?: string;

  @Field({ nullable: true })
  position?: string;

  @Field(() => Int, { nullable: true })
  gradYear?: number;

  @Field()
  guardianApproved!: boolean;
}

@InputType()
export class AthleteInput {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  displayName!: string;

  @Field(() => [ID])
  sportIds!: string[];

  @Field(() => [ID])
  seasonIds!: string[];

  @Field({ nullable: true })
  jerseyNumber?: string;

  @Field({ nullable: true })
  position?: string;

  @Field(() => Int, { nullable: true })
  gradYear?: number;

  @Field({ nullable: true })
  guardianApproved?: boolean;
}

@ObjectType()
export class GameEventGql {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field(() => ID)
  sportId!: string;

  @Field(() => ID, { nullable: true })
  seasonId?: string;

  @Field(() => TeamLevel, { nullable: true })
  level?: TeamLevel;

  @Field()
  startTimeIso!: string;

  @Field({ nullable: true })
  locationName?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  homeTeamName?: string;

  @Field({ nullable: true })
  awayTeamName?: string;

  @Field(() => EventStatus)
  status!: EventStatus;
}

@InputType()
export class GameEventInput {
  @Field()
  title!: string;

  @Field(() => ID)
  sportId!: string;

  @Field(() => ID, { nullable: true })
  seasonId?: string;

  @Field(() => TeamLevel, { nullable: true })
  level?: TeamLevel;

  @Field()
  startTimeIso!: string;

  @Field({ nullable: true })
  locationName?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  homeTeamName?: string;

  @Field({ nullable: true })
  awayTeamName?: string;
}

@ObjectType()
export class SponsorGql {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => SponsorTier, { nullable: true })
  tier?: SponsorTier;

  @Field({ nullable: true })
  websiteUrl?: string;

  @Field({ nullable: true })
  promoCode?: string;
}

@InputType()
export class SponsorInput {
  @Field()
  name!: string;

  @Field(() => SponsorTier, { nullable: true })
  tier?: SponsorTier;

  @Field({ nullable: true })
  websiteUrl?: string;

  @Field({ nullable: true })
  promoCode?: string;
}

@ObjectType()
export class ProductGql {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  priceCents!: number;

  @Field()
  currency!: string;

  @Field({ nullable: true })
  sku?: string;

  @Field()
  inStock!: boolean;
}

@InputType()
export class ProductInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  priceCents!: number;

  @Field({ nullable: true })
  currency?: string;

  @Field({ nullable: true })
  sku?: string;

  @Field({ nullable: true })
  inStock?: boolean;
}

@ObjectType()
export class OrderDonationGql {
  @Field(() => ID)
  id!: string;

  @Field(() => OrderDonationKind)
  kind!: OrderDonationKind;

  @Field()
  createdAtIso!: string;

  @Field(() => Int)
  amountCents!: number;

  @Field()
  currency!: string;

  @Field(() => OrderDonationStatus)
  status!: OrderDonationStatus;
}

@InputType()
export class OrderDonationInput {
  @Field(() => OrderDonationKind)
  kind!: OrderDonationKind;

  @Field(() => Int)
  amountCents!: number;

  @Field({ nullable: true })
  currency?: string;
}
