import { AuditService } from '../../audit/audit.service';
import { V1DataService } from '../v1.data.service';
declare class CreateSponsorDto {
    name: string;
    tier?: string;
    promoCode?: string;
}
declare class UpdateSponsorDto {
    name?: string;
    tier?: string;
    promoCode?: string;
}
export declare class SponsorsController {
    private readonly data;
    private readonly audit;
    constructor(data: V1DataService, audit: AuditService);
    list(): {
        id: string;
        name: string;
        tier?: "Hero" | "Ribbon" | "Takeover" | "Bumper" | undefined;
        websiteUrl?: string | undefined;
        promoCode?: string | undefined;
    }[];
    get(id: string): {
        id: string;
        name: string;
        tier?: "Hero" | "Ribbon" | "Takeover" | "Bumper" | undefined;
        websiteUrl?: string | undefined;
        promoCode?: string | undefined;
    } | undefined;
    create(dto: CreateSponsorDto): {
        id: string;
        name: string;
        tier?: "Hero" | "Ribbon" | "Takeover" | "Bumper" | undefined;
        websiteUrl?: string | undefined;
        promoCode?: string | undefined;
    };
    update(id: string, dto: UpdateSponsorDto): {
        id: string;
        name: string;
        tier?: "Hero" | "Ribbon" | "Takeover" | "Bumper" | undefined;
        websiteUrl?: string | undefined;
        promoCode?: string | undefined;
    } | undefined;
    delete(id: string): {
        ok: boolean;
    };
}
export {};
