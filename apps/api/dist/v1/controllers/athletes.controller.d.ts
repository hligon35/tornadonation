import { AuditService } from '../../audit/audit.service';
import { V1DataService } from '../v1.data.service';
declare class CreateAthleteDto {
    firstName: string;
    lastName: string;
    displayName: string;
    sportIds: string[];
    seasonIds: string[];
    guardianApproved?: boolean;
}
declare class UpdateAthleteDto {
    displayName?: string;
    guardianApproved?: boolean;
}
export declare class AthletesController {
    private readonly data;
    private readonly audit;
    constructor(data: V1DataService, audit: AuditService);
    list(): {
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
    get(id: string): {
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
    create(dto: CreateAthleteDto): {
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
    update(id: string, dto: UpdateAthleteDto): {
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
    delete(id: string): {
        ok: boolean;
    };
}
export {};
