import { V1DataService } from '../v1.data.service';
import { AthleteInput, GameEventInput, OrderDonationInput, ProductInput, SeasonInput, SponsorInput, SportInput, TeamInput } from './types';
export declare class SportsResolver {
    private readonly data;
    constructor(data: V1DataService);
    sports(): {
        id: string;
        name: string;
        slug: string;
    }[];
    sport(id: string): {
        id: string;
        name: string;
        slug: string;
    } | undefined;
    createSport(input: SportInput): {
        id: string;
        name: string;
        slug: string;
    };
    updateSport(id: string, input: SportInput): {
        id: string;
        name: string;
        slug: string;
    } | undefined;
    deleteSport(id: string): boolean;
}
export declare class SeasonsResolver {
    private readonly data;
    constructor(data: V1DataService);
    seasons(): {
        id: string;
        sportId: string;
        year: number;
        label: string;
    }[];
    season(id: string): {
        id: string;
        sportId: string;
        year: number;
        label: string;
    } | undefined;
    createSeason(input: SeasonInput): {
        id: string;
        sportId: string;
        year: number;
        label: string;
    };
    updateSeason(id: string, label?: string): {
        id: string;
        sportId: string;
        year: number;
        label: string;
    } | undefined;
    deleteSeason(id: string): boolean;
}
export declare class TeamsResolver {
    private readonly data;
    constructor(data: V1DataService);
    teams(): {
        id: string;
        name: string;
        sportId: string;
        seasonId: string;
        level: "Varsity" | "JV";
    }[];
    team(id: string): {
        id: string;
        name: string;
        sportId: string;
        seasonId: string;
        level: "Varsity" | "JV";
    } | undefined;
    createTeam(input: TeamInput): {
        id: string;
        name: string;
        sportId: string;
        seasonId: string;
        level: "Varsity" | "JV";
    };
    updateTeam(id: string, name: string): {
        id: string;
        name: string;
        sportId: string;
        seasonId: string;
        level: "Varsity" | "JV";
    } | undefined;
    deleteTeam(id: string): boolean;
}
export declare class AthletesResolver {
    private readonly data;
    constructor(data: V1DataService);
    athletes(): {
        id: string;
        firstName: string;
        lastName: string;
        displayName: string;
        sportIds: string[];
        seasonIds: string[];
        guardianApproved: boolean;
        jerseyNumber?: string | undefined;
        position?: string | undefined;
        gradYear?: number | undefined;
    }[];
    athlete(id: string): {
        id: string;
        firstName: string;
        lastName: string;
        displayName: string;
        sportIds: string[];
        seasonIds: string[];
        guardianApproved: boolean;
        jerseyNumber?: string | undefined;
        position?: string | undefined;
        gradYear?: number | undefined;
    } | undefined;
    createAthlete(input: AthleteInput): {
        id: string;
        firstName: string;
        lastName: string;
        displayName: string;
        sportIds: string[];
        seasonIds: string[];
        guardianApproved: boolean;
        jerseyNumber?: string | undefined;
        position?: string | undefined;
        gradYear?: number | undefined;
    };
    updateAthlete(id: string, guardianApproved?: boolean): {
        id: string;
        firstName: string;
        lastName: string;
        displayName: string;
        sportIds: string[];
        seasonIds: string[];
        guardianApproved: boolean;
        jerseyNumber?: string | undefined;
        position?: string | undefined;
        gradYear?: number | undefined;
    } | undefined;
    deleteAthlete(id: string): boolean;
}
export declare class EventsResolver {
    private readonly data;
    constructor(data: V1DataService);
    events(): {
        status: "Scheduled" | "Live" | "Final" | "Canceled";
        id: string;
        sportId: string;
        title: string;
        startTimeIso: string;
        seasonId?: string | undefined;
        level?: "Varsity" | "JV" | undefined;
        locationName?: string | undefined;
        address?: string | undefined;
        homeTeamName?: string | undefined;
        awayTeamName?: string | undefined;
    }[];
    event(id: string): {
        status: "Scheduled" | "Live" | "Final" | "Canceled";
        id: string;
        sportId: string;
        title: string;
        startTimeIso: string;
        seasonId?: string | undefined;
        level?: "Varsity" | "JV" | undefined;
        locationName?: string | undefined;
        address?: string | undefined;
        homeTeamName?: string | undefined;
        awayTeamName?: string | undefined;
    } | undefined;
    createEvent(input: GameEventInput): {
        status: "Scheduled" | "Live" | "Final" | "Canceled";
        id: string;
        sportId: string;
        title: string;
        startTimeIso: string;
        seasonId?: string | undefined;
        level?: "Varsity" | "JV" | undefined;
        locationName?: string | undefined;
        address?: string | undefined;
        homeTeamName?: string | undefined;
        awayTeamName?: string | undefined;
    };
    updateEvent(id: string, title?: string): {
        status: "Scheduled" | "Live" | "Final" | "Canceled";
        id: string;
        sportId: string;
        title: string;
        startTimeIso: string;
        seasonId?: string | undefined;
        level?: "Varsity" | "JV" | undefined;
        locationName?: string | undefined;
        address?: string | undefined;
        homeTeamName?: string | undefined;
        awayTeamName?: string | undefined;
    } | undefined;
    deleteEvent(id: string): boolean;
}
export declare class SponsorsResolver {
    private readonly data;
    constructor(data: V1DataService);
    sponsors(): {
        id: string;
        name: string;
        tier?: "Hero" | "Ribbon" | "Takeover" | "Bumper" | undefined;
        websiteUrl?: string | undefined;
        promoCode?: string | undefined;
    }[];
    sponsor(id: string): {
        id: string;
        name: string;
        tier?: "Hero" | "Ribbon" | "Takeover" | "Bumper" | undefined;
        websiteUrl?: string | undefined;
        promoCode?: string | undefined;
    } | undefined;
    createSponsor(input: SponsorInput): {
        id: string;
        name: string;
        tier?: "Hero" | "Ribbon" | "Takeover" | "Bumper" | undefined;
        websiteUrl?: string | undefined;
        promoCode?: string | undefined;
    };
    updateSponsor(id: string, input: SponsorInput): {
        id: string;
        name: string;
        tier?: "Hero" | "Ribbon" | "Takeover" | "Bumper" | undefined;
        websiteUrl?: string | undefined;
        promoCode?: string | undefined;
    } | undefined;
    deleteSponsor(id: string): boolean;
}
export declare class ProductsResolver {
    private readonly data;
    constructor(data: V1DataService);
    products(): {
        id: string;
        title: string;
        priceCents: number;
        currency: string;
        inStock: boolean;
        description?: string | undefined;
        sku?: string | undefined;
    }[];
    product(id: string): {
        id: string;
        title: string;
        priceCents: number;
        currency: string;
        inStock: boolean;
        description?: string | undefined;
        sku?: string | undefined;
    } | undefined;
    createProduct(input: ProductInput): {
        id: string;
        title: string;
        priceCents: number;
        currency: string;
        inStock: boolean;
        description?: string | undefined;
        sku?: string | undefined;
    };
    updateProduct(id: string, input: ProductInput): {
        id: string;
        title: string;
        priceCents: number;
        currency: string;
        inStock: boolean;
        description?: string | undefined;
        sku?: string | undefined;
    } | undefined;
    deleteProduct(id: string): boolean;
}
export declare class OrdersDonationsResolver {
    private readonly data;
    constructor(data: V1DataService);
    ordersDonations(): {
        status: "Canceled" | "Pending" | "Paid" | "Refunded";
        id: string;
        currency: string;
        kind: "Order" | "Donation";
        createdAtIso: string;
        amountCents: number;
    }[];
    orderDonation(id: string): {
        status: "Canceled" | "Pending" | "Paid" | "Refunded";
        id: string;
        currency: string;
        kind: "Order" | "Donation";
        createdAtIso: string;
        amountCents: number;
    } | undefined;
    createOrderDonation(input: OrderDonationInput): {
        status: "Canceled" | "Pending" | "Paid" | "Refunded";
        id: string;
        currency: string;
        kind: "Order" | "Donation";
        createdAtIso: string;
        amountCents: number;
    };
    deleteOrderDonation(id: string): boolean;
}
