import { InMemoryRepo } from './repo/in-memory-repo';
export declare class V1DataService {
    readonly sports: InMemoryRepo<{
        id: string;
        name: string;
        slug: string;
    }>;
    readonly seasons: InMemoryRepo<{
        id: string;
        sportId: string;
        year: number;
        label: string;
    }>;
    readonly teams: InMemoryRepo<{
        id: string;
        name: string;
        sportId: string;
        seasonId: string;
        level: "Varsity" | "JV";
    }>;
    readonly athletes: InMemoryRepo<{
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
    }>;
    readonly events: InMemoryRepo<{
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
    }>;
    readonly sponsors: InMemoryRepo<{
        id: string;
        name: string;
        tier?: "Hero" | "Ribbon" | "Takeover" | "Bumper" | undefined;
        websiteUrl?: string | undefined;
        promoCode?: string | undefined;
    }>;
    readonly products: InMemoryRepo<{
        id: string;
        title: string;
        priceCents: number;
        currency: string;
        inStock: boolean;
        description?: string | undefined;
        sku?: string | undefined;
    }>;
    readonly ordersDonations: InMemoryRepo<{
        status: "Canceled" | "Pending" | "Paid" | "Refunded";
        id: string;
        currency: string;
        kind: "Order" | "Donation";
        createdAtIso: string;
        amountCents: number;
    }>;
}
