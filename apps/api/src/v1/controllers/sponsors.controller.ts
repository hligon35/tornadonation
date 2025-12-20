import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';

import { AuthGuard } from '../../auth/auth.guard';
import { Roles } from '../../auth/roles';
import { RolesGuard } from '../../auth/roles.guard';
import { AuditService } from '../../audit/audit.service';
import { V1DataService } from '../v1.data.service';

class CreateSponsorDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  tier?: string;

  @IsOptional()
  @IsString()
  promoCode?: string;
}

class UpdateSponsorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  tier?: string;

  @IsOptional()
  @IsString()
  promoCode?: string;
}

@Controller('/v1/sponsors')
@UseGuards(AuthGuard)
export class SponsorsController {
  constructor(
    private readonly data: V1DataService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  list() {
    return this.data.sponsors.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.data.sponsors.get(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('Admin')
  create(@Body() dto: CreateSponsorDto) {
    const created = this.data.sponsors.create({
      name: dto.name,
      tier: dto.tier as any,
      promoCode: dto.promoCode,
    });
    this.audit.record({
      actorRole: 'Admin',
      action: 'create',
      entity: 'Sponsor',
      entityId: created.id,
    });
    return created;
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('Admin')
  update(@Param('id') id: string, @Body() dto: UpdateSponsorDto) {
    const updated = this.data.sponsors.update(id, dto as any);
    this.audit.record({
      actorRole: 'Admin',
      action: 'update',
      entity: 'Sponsor',
      entityId: id,
    });
    return updated;
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('Admin')
  delete(@Param('id') id: string) {
    const ok = this.data.sponsors.delete(id);
    this.audit.record({
      actorRole: 'Admin',
      action: 'delete',
      entity: 'Sponsor',
      entityId: id,
    });
    return { ok };
  }
}
