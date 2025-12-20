export type AuditEntry = {
    id: string;
    atIso: string;
    actorRole: string;
    action: string;
    entity: string;
    entityId?: string;
};
export declare class AuditService {
    private readonly entries;
    record(entry: Omit<AuditEntry, 'id' | 'atIso'>): void;
    list(): AuditEntry[];
}
