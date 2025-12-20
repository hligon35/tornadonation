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

class CreateTeamDto {
  @IsString()
  sportId!: string;

  @IsString()
  seasonId!: string;

  @IsString()
  level!: string;

  @IsString()
  name!: string;
}

class UpdateTeamDto {
  @IsOptional()
  @IsString()
  name?: string;
}

@Controller('/v1/teams')
@UseGuards(AuthGuard)
export class TeamsController {
  constructor(
    private readonly data: V1DataService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  list() {
    return this.data.teams.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.data.teams.get(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('AthleticStaff', 'Admin')
  create(@Body() dto: CreateTeamDto) {
    const created = this.data.teams.create({
      sportId: dto.sportId,
      seasonId: dto.seasonId,
      level: dto.level as any,
      name: dto.name,
    });
    this.audit.record({
      actorRole: 'AthleticStaff',
      action: 'create',
      entity: 'Team',
      entityId: created.id,
    });
    return created;
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('AthleticStaff', 'Admin')
  update(@Param('id') id: string, @Body() dto: UpdateTeamDto) {
    const updated = this.data.teams.update(id, dto as any);
    this.audit.record({
      actorRole: 'AthleticStaff',
      action: 'update',
      entity: 'Team',
      entityId: id,
    });
    return updated;
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('AthleticStaff', 'Admin')
  delete(@Param('id') id: string) {
    const ok = this.data.teams.delete(id);
    this.audit.record({
      actorRole: 'AthleticStaff',
      action: 'delete',
      entity: 'Team',
      entityId: id,
    });
    return { ok };
  }
}
