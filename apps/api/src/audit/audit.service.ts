import { Injectable } from '@nestjs/common';

export type AuditEntry = {
  id: string;
  atIso: string;
  actorRole: string;
  action: string;
  entity: string;
  entityId?: string;
};

@Injectable()
export class AuditService {
  private readonly entries: AuditEntry[] = [];

  record(entry: Omit<AuditEntry, 'id' | 'atIso'>) {
    this.entries.unshift({
      id: crypto.randomUUID(),
      atIso: new Date().toISOString(),
      ...entry,
    });
  }

  list(): AuditEntry[] {
    return this.entries;
  }
}
