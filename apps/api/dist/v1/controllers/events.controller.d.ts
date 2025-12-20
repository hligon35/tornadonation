import { AuditService } from '../../audit/audit.service';
import { V1DataService } from '../v1.data.service';
declare class CreateEventDto {
    title: string;
    sportId: string;
    startTimeIso: string;
    seasonId?: string;
    level?: string;
}
declare class UpdateEventDto {
    title?: string;
    startTimeIso?: string;
    status?: string;
}
export declare class EventsController {
    private readonly data;
    private readonly audit;
    constructor(data: V1DataService, audit: AuditService);
    list(): {
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
    get(id: string): {
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
    create(dto: CreateEventDto): {
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
    update(id: string, dto: UpdateEventDto): {
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
    delete(id: string): {
        ok: boolean;
    };
}
export {};
