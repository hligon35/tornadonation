import { AuditService } from '../../audit/audit.service';
import { V1DataService } from '../v1.data.service';
declare class CreateSportDto {
    name: string;
    slug: string;
}
declare class UpdateSportDto {
    name?: string;
    slug?: string;
}
export declare class SportsController {
    private readonly data;
    private readonly audit;
    constructor(data: V1DataService, audit: AuditService);
    list(): {
        id: string;
        name: string;
        slug: string;
    }[];
    get(id: string): {
        id: string;
        name: string;
        slug: string;
    } | undefined;
    create(dto: CreateSportDto): {
        id: string;
        name: string;
        slug: string;
    };
    update(id: string, dto: UpdateSportDto): {
        id: string;
        name: string;
        slug: string;
    } | undefined;
    delete(id: string): {
        ok: boolean;
    };
}
export {};
