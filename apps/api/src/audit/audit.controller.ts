import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { AuditService } from './audit.service';

@Controller('/v1/audit')
@UseGuards(AuthGuard)
export class AuditController {
  constructor(private readonly audit: AuditService) {}

  @Get()
  list() {
    return this.audit.list();
  }
}
