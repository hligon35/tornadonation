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
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

import { AuthGuard } from '../../auth/auth.guard';
import { Roles } from '../../auth/roles';
import { RolesGuard } from '../../auth/roles.guard';
import { AuditService } from '../../audit/audit.service';
import { V1DataService } from '../v1.data.service';

class CreateAthleteDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  displayName!: string;

  @IsArray()
  sportIds!: string[];

  @IsArray()
  seasonIds!: string[];

  @IsOptional()
  @IsBoolean()
  guardianApproved?: boolean;
}

class UpdateAthleteDto {
  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsBoolean()
  guardianApproved?: boolean;
}

@Controller('/v1/athletes')
@UseGuards(AuthGuard)
export class AthletesController {
  constructor(
    private readonly data: V1DataService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  list() {
    return this.data.athletes.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.data.athletes.get(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('AthleticStaff', 'Admin')
  create(@Body() dto: CreateAthleteDto) {
    const created = this.data.athletes.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      displayName: dto.displayName,
      sportIds: dto.sportIds,
      seasonIds: dto.seasonIds,
      guardianApproved: dto.guardianApproved ?? false,
    });
    this.audit.record({
      actorRole: 'AthleticStaff',
      action: 'create',
      entity: 'Athlete',
      entityId: created.id,
    });
    return created;
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('AthleticStaff', 'Admin')
  update(@Param('id') id: string, @Body() dto: UpdateAthleteDto) {
    const updated = this.data.athletes.update(id, dto as any);
    this.audit.record({
      actorRole: 'AthleticStaff',
      action: 'update',
      entity: 'Athlete',
      entityId: id,
    });
    return updated;
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('AthleticStaff', 'Admin')
  delete(@Param('id') id: string) {
    const ok = this.data.athletes.delete(id);
    this.audit.record({
      actorRole: 'AthleticStaff',
      action: 'delete',
      entity: 'Athlete',
      entityId: id,
    });
    return { ok };
  }
}
