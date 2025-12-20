import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { V1DataService } from '../v1.data.service';
import {
  AthleteGql,
  AthleteInput,
  GameEventGql,
  GameEventInput,
  OrderDonationGql,
  OrderDonationInput,
  ProductGql,
  ProductInput,
  SeasonGql,
  SeasonInput,
  SponsorGql,
  SponsorInput,
  SportGql,
  SportInput,
  TeamGql,
  TeamInput,
} from './types';

@Resolver(() => SportGql)
export class SportsResolver {
  constructor(private readonly data: V1DataService) {}

  @Query(() => [SportGql])
  sports() {
    return this.data.sports.list();
  }

  @Query(() => SportGql, { nullable: true })
  sport(@Args('id', { type: () => ID }) id: string) {
    return this.data.sports.get(id);
  }

  @Mutation(() => SportGql)
  createSport(@Args('input') input: SportInput) {
    return this.data.sports.create({ id: input.slug, ...input });
  }

  @Mutation(() => SportGql, { nullable: true })
  updateSport(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: SportInput,
  ) {
    return this.data.sports.update(id, input);
  }

  @Mutation(() => Boolean)
  deleteSport(@Args('id', { type: () => ID }) id: string) {
    return this.data.sports.delete(id);
  }
}

@Resolver(() => SeasonGql)
export class SeasonsResolver {
  constructor(private readonly data: V1DataService) {}

  @Query(() => [SeasonGql])
  seasons() {
    return this.data.seasons.list();
  }

  @Query(() => SeasonGql, { nullable: true })
  season(@Args('id', { type: () => ID }) id: string) {
    return this.data.seasons.get(id);
  }

  @Mutation(() => SeasonGql)
  createSeason(@Args('input') input: SeasonInput) {
    return this.data.seasons.create({
      sportId: input.sportId,
      year: input.year,
      label: input.label ?? String(input.year),
    });
  }

  @Mutation(() => SeasonGql, { nullable: true })
  updateSeason(
    @Args('id', { type: () => ID }) id: string,
    @Args('label', { type: () => String, nullable: true }) label?: string,
  ) {
    return this.data.seasons.update(id, label ? { label } : {});
  }

  @Mutation(() => Boolean)
  deleteSeason(@Args('id', { type: () => ID }) id: string) {
    return this.data.seasons.delete(id);
  }
}

@Resolver(() => TeamGql)
export class TeamsResolver {
  constructor(private readonly data: V1DataService) {}

  @Query(() => [TeamGql])
  teams() {
    return this.data.teams.list();
  }

  @Query(() => TeamGql, { nullable: true })
  team(@Args('id', { type: () => ID }) id: string) {
    return this.data.teams.get(id);
  }

  @Mutation(() => TeamGql)
  createTeam(@Args('input') input: TeamInput) {
    return this.data.teams.create(input as any);
  }

  @Mutation(() => TeamGql, { nullable: true })
  updateTeam(
    @Args('id', { type: () => ID }) id: string,
    @Args('name', { type: () => String }) name: string,
  ) {
    return this.data.teams.update(id, { name } as any);
  }

  @Mutation(() => Boolean)
  deleteTeam(@Args('id', { type: () => ID }) id: string) {
    return this.data.teams.delete(id);
  }
}

@Resolver(() => AthleteGql)
export class AthletesResolver {
  constructor(private readonly data: V1DataService) {}

  @Query(() => [AthleteGql])
  athletes() {
    return this.data.athletes.list();
  }

  @Query(() => AthleteGql, { nullable: true })
  athlete(@Args('id', { type: () => ID }) id: string) {
    return this.data.athletes.get(id);
  }

  @Mutation(() => AthleteGql)
  createAthlete(@Args('input') input: AthleteInput) {
    return this.data.athletes.create({
      guardianApproved: false,
      ...input,
    } as any);
  }

  @Mutation(() => AthleteGql, { nullable: true })
  updateAthlete(
    @Args('id', { type: () => ID }) id: string,
    @Args('guardianApproved', { type: () => Boolean, nullable: true })
    guardianApproved?: boolean,
  ) {
    return this.data.athletes.update(
      id,
      typeof guardianApproved === 'boolean' ? { guardianApproved } : {},
    );
  }

  @Mutation(() => Boolean)
  deleteAthlete(@Args('id', { type: () => ID }) id: string) {
    return this.data.athletes.delete(id);
  }
}

@Resolver(() => GameEventGql)
export class EventsResolver {
  constructor(private readonly data: V1DataService) {}

  @Query(() => [GameEventGql])
  events() {
    return this.data.events.list();
  }

  @Query(() => GameEventGql, { nullable: true })
  event(@Args('id', { type: () => ID }) id: string) {
    return this.data.events.get(id);
  }

  @Mutation(() => GameEventGql)
  createEvent(@Args('input') input: GameEventInput) {
    return this.data.events.create({
      ...input,
      status: 'Scheduled',
    } as any);
  }

  @Mutation(() => GameEventGql, { nullable: true })
  updateEvent(
    @Args('id', { type: () => ID }) id: string,
    @Args('title', { type: () => String, nullable: true }) title?: string,
  ) {
    return this.data.events.update(id, title ? ({ title } as any) : {});
  }

  @Mutation(() => Boolean)
  deleteEvent(@Args('id', { type: () => ID }) id: string) {
    return this.data.events.delete(id);
  }
}

@Resolver(() => SponsorGql)
export class SponsorsResolver {
  constructor(private readonly data: V1DataService) {}

  @Query(() => [SponsorGql])
  sponsors() {
    return this.data.sponsors.list();
  }

  @Query(() => SponsorGql, { nullable: true })
  sponsor(@Args('id', { type: () => ID }) id: string) {
    return this.data.sponsors.get(id);
  }

  @Mutation(() => SponsorGql)
  createSponsor(@Args('input') input: SponsorInput) {
    return this.data.sponsors.create(input as any);
  }

  @Mutation(() => SponsorGql, { nullable: true })
  updateSponsor(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: SponsorInput,
  ) {
    return this.data.sponsors.update(id, input as any);
  }

  @Mutation(() => Boolean)
  deleteSponsor(@Args('id', { type: () => ID }) id: string) {
    return this.data.sponsors.delete(id);
  }
}

@Resolver(() => ProductGql)
export class ProductsResolver {
  constructor(private readonly data: V1DataService) {}

  @Query(() => [ProductGql])
  products() {
    return this.data.products.list();
  }

  @Query(() => ProductGql, { nullable: true })
  product(@Args('id', { type: () => ID }) id: string) {
    return this.data.products.get(id);
  }

  @Mutation(() => ProductGql)
  createProduct(@Args('input') input: ProductInput) {
    return this.data.products.create({
      ...input,
      currency: input.currency ?? 'USD',
      inStock: input.inStock ?? true,
    } as any);
  }

  @Mutation(() => ProductGql, { nullable: true })
  updateProduct(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: ProductInput,
  ) {
    return this.data.products.update(id, input as any);
  }

  @Mutation(() => Boolean)
  deleteProduct(@Args('id', { type: () => ID }) id: string) {
    return this.data.products.delete(id);
  }
}

@Resolver(() => OrderDonationGql)
export class OrdersDonationsResolver {
  constructor(private readonly data: V1DataService) {}

  @Query(() => [OrderDonationGql])
  ordersDonations() {
    return this.data.ordersDonations.list();
  }

  @Query(() => OrderDonationGql, { nullable: true })
  orderDonation(@Args('id', { type: () => ID }) id: string) {
    return this.data.ordersDonations.get(id);
  }

  @Mutation(() => OrderDonationGql)
  createOrderDonation(@Args('input') input: OrderDonationInput) {
    return this.data.ordersDonations.create({
      kind: input.kind as any,
      createdAtIso: new Date().toISOString(),
      amountCents: input.amountCents,
      currency: input.currency ?? 'USD',
      status: 'Pending',
    } as any);
  }

  @Mutation(() => Boolean)
  deleteOrderDonation(@Args('id', { type: () => ID }) id: string) {
    return this.data.ordersDonations.delete(id);
  }
}
