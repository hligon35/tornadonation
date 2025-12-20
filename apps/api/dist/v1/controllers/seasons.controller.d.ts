import { AuditService } from '../../audit/audit.service';
import { V1DataService } from '../v1.data.service';
declare class CreateSeasonDto {
    sportId: string;
    year: number;
    label?: string;
}
declare class UpdateSeasonDto {
    year?: number;
    label?: string;
}
export declare class SeasonsController {
    private readonly data;
    private readonly audit;
    constructor(data: V1DataService, audit: AuditService);
    list(): {
        id: string;
        sportId: string;
        year: number;
        label: string;
    }[];
    get(id: string): {
        id: string;
        sportId: string;
        year: number;
        label: string;
    } | undefined;
    create(dto: CreateSeasonDto): {
        id: string;
        sportId: string;
        year: number;
        label: string;
    };
    update(id: string, dto: UpdateSeasonDto): {
        id: string;
        sportId: string;
        year: number;
        label: string;
    } | undefined;
    delete(id: string): {
        ok: boolean;
    };
}
export {};
