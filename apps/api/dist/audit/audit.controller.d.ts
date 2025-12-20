import { AuditService } from './audit.service';
export declare class AuditController {
    private readonly audit;
    constructor(audit: AuditService);
    list(): import("./audit.service").AuditEntry[];
}
