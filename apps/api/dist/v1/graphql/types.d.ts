export declare enum TeamLevel {
    Varsity = "Varsity",
    JV = "JV"
}
export declare enum EventStatus {
    Scheduled = "Scheduled",
    Live = "Live",
    Final = "Final",
    Canceled = "Canceled"
}
export declare enum SponsorTier {
    Hero = "Hero",
    Ribbon = "Ribbon",
    Takeover = "Takeover",
    Bumper = "Bumper"
}
export declare enum OrderDonationKind {
    Order = "Order",
    Donation = "Donation"
}
export declare enum OrderDonationStatus {
    Pending = "Pending",
    Paid = "Paid",
    Refunded = "Refunded",
    Canceled = "Canceled"
}
export declare class SportGql {
    id: string;
    name: string;
    slug: string;
}
export declare class SportInput {
    name: string;
    slug: string;
}
export declare class SeasonGql {
    id: string;
    sportId: string;
    year: number;
    label: string;
}
export declare class SeasonInput {
    sportId: string;
    year: number;
    label?: string;
}
export declare class TeamGql {
    id: string;
    sportId: string;
    seasonId: string;
    level: TeamLevel;
    name: string;
}
export declare class TeamInput {
    sportId: string;
    seasonId: string;
    level: TeamLevel;
    name: string;
}
export declare class AthleteGql {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    sportIds: string[];
    seasonIds: string[];
    jerseyNumber?: string;
    position?: string;
    gradYear?: number;
    guardianApproved: boolean;
}
export declare class AthleteInput {
    firstName: string;
    lastName: string;
    displayName: string;
    sportIds: string[];
    seasonIds: string[];
    jerseyNumber?: string;
    position?: string;
    gradYear?: number;
    guardianApproved?: boolean;
}
export declare class GameEventGql {
    id: string;
    title: string;
    sportId: string;
    seasonId?: string;
    level?: TeamLevel;
    startTimeIso: string;
    locationName?: string;
    address?: string;
    homeTeamName?: string;
    awayTeamName?: string;
    status: EventStatus;
}
export declare class GameEventInput {
    title: string;
    sportId: string;
    seasonId?: string;
    level?: TeamLevel;
    startTimeIso: string;
    locationName?: string;
    address?: string;
    homeTeamName?: string;
    awayTeamName?: string;
}
export declare class SponsorGql {
    id: string;
    name: string;
    tier?: SponsorTier;
    websiteUrl?: string;
    promoCode?: string;
}
export declare class SponsorInput {
    name: string;
    tier?: SponsorTier;
    websiteUrl?: string;
    promoCode?: string;
}
export declare class ProductGql {
    id: string;
    title: string;
    description?: string;
    priceCents: number;
    currency: string;
    sku?: string;
    inStock: boolean;
}
export declare class ProductInput {
    title: string;
    description?: string;
    priceCents: number;
    currency?: string;
    sku?: string;
    inStock?: boolean;
}
export declare class OrderDonationGql {
    id: string;
    kind: OrderDonationKind;
    createdAtIso: string;
    amountCents: number;
    currency: string;
    status: OrderDonationStatus;
}
export declare class OrderDonationInput {
    kind: OrderDonationKind;
    amountCents: number;
    currency?: string;
}
