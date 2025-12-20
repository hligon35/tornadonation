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

class CreateEventDto {
  @IsString()
  title!: string;

  @IsString()
  sportId!: string;

  @IsString()
  startTimeIso!: string;

  @IsOptional()
  @IsString()
  seasonId?: string;

  @IsOptional()
  @IsString()
  level?: string;
}

class UpdateEventDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  startTimeIso?: string;

  @IsOptional()
  @IsString()
  status?: string;
}

@Controller('/v1/events')
@UseGuards(AuthGuard)
export class EventsController {
  constructor(
    private readonly data: V1DataService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  list() {
    return this.data.events.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.data.events.get(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('AthleticStaff', 'Admin')
  create(@Body() dto: CreateEventDto) {
    const created = this.data.events.create({
      title: dto.title,
      sportId: dto.sportId,
      seasonId: dto.seasonId,
      level: (dto.level as any) ?? undefined,
      startTimeIso: dto.startTimeIso,
      status: 'Scheduled',
    });
    this.audit.record({
      actorRole: 'AthleticStaff',
      action: 'create',
      entity: 'GameEvent',
      entityId: created.id,
    });
    return created;
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('AthleticStaff', 'Admin')
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    const updated = this.data.events.update(id, dto as any);
    this.audit.record({
      actorRole: 'AthleticStaff',
      action: 'update',
      entity: 'GameEvent',
      entityId: id,
    });
    return updated;
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('AthleticStaff', 'Admin')
  delete(@Param('id') id: string) {
    const ok = this.data.events.delete(id);
    this.audit.record({
      actorRole: 'AthleticStaff',
      action: 'delete',
      entity: 'GameEvent',
      entityId: id,
    });
    return { ok };
  }
}
