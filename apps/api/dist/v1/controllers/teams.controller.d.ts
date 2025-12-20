import { AuditService } from '../../audit/audit.service';
import { V1DataService } from '../v1.data.service';
declare class CreateTeamDto {
    sportId: string;
    seasonId: string;
    level: string;
    name: string;
}
declare class UpdateTeamDto {
    name?: string;
}
export declare class TeamsController {
    private readonly data;
    private readonly audit;
    constructor(data: V1DataService, audit: AuditService);
    list(): {
        id: string;
        name: string;
        sportId: string;
        seasonId: string;
        level: "Varsity" | "JV";
    }[];
    get(id: string): {
        id: string;
        name: string;
        sportId: string;
        seasonId: string;
        level: "Varsity" | "JV";
    } | undefined;
    create(dto: CreateTeamDto): {
        id: string;
        name: string;
        sportId: string;
        seasonId: string;
        level: "Varsity" | "JV";
    };
    update(id: string, dto: UpdateTeamDto): {
        id: string;
        name: string;
        sportId: string;
        seasonId: string;
        level: "Varsity" | "JV";
    } | undefined;
    delete(id: string): {
        ok: boolean;
    };
}
export {};
