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
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { AuthGuard } from '../../auth/auth.guard';
import { Roles } from '../../auth/roles';
import { RolesGuard } from '../../auth/roles.guard';
import { AuditService } from '../../audit/audit.service';
import { V1DataService } from '../v1.data.service';

class CreateSeasonDto {
  @IsString()
  sportId!: string;

  @IsInt()
  @Min(1900)
  @Max(2100)
  year!: number;

  @IsOptional()
  @IsString()
  label?: string;
}

class UpdateSeasonDto {
  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(2100)
  year?: number;

  @IsOptional()
  @IsString()
  label?: string;
}

@Controller('/v1/seasons')
@UseGuards(AuthGuard)
export class SeasonsController {
  constructor(
    private readonly data: V1DataService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  list() {
    return this.data.seasons.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.data.seasons.get(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('AthleticStaff', 'Admin')
  create(@Body() dto: CreateSeasonDto) {
    const created = this.data.seasons.create({
      sportId: dto.sportId,
      year: dto.year,
      label: dto.label ?? String(dto.year),
    });
    this.audit.record({
      actorRole: 'AthleticStaff',
      action: 'create',
      entity: 'Season',
      entityId: created.id,
    });
    return created;
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('AthleticStaff', 'Admin')
  update(@Param('id') id: string, @Body() dto: UpdateSeasonDto) {
    const updated = this.data.seasons.update(id, dto as any);
    this.audit.record({
      actorRole: 'AthleticStaff',
      action: 'update',
      entity: 'Season',
      entityId: id,
    });
    return updated;
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('AthleticStaff', 'Admin')
  delete(@Param('id') id: string) {
    const ok = this.data.seasons.delete(id);
    this.audit.record({
      actorRole: 'AthleticStaff',
      action: 'delete',
      entity: 'Season',
      entityId: id,
    });
    return { ok };
  }
}
