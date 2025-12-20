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
import { IsString } from 'class-validator';

import { AuthGuard } from '../../auth/auth.guard';
import { Roles } from '../../auth/roles';
import { RolesGuard } from '../../auth/roles.guard';
import { AuditService } from '../../audit/audit.service';
import { V1DataService } from '../v1.data.service';

class CreateSportDto {
  @IsString()
  name!: string;

  @IsString()
  slug!: string;
}

class UpdateSportDto {
  @IsString()
  name?: string;

  @IsString()
  slug?: string;
}

@Controller('/v1/sports')
@UseGuards(AuthGuard)
export class SportsController {
  constructor(
    private readonly data: V1DataService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  list() {
    return this.data.sports.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.data.sports.get(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('AthleticStaff', 'Admin')
  create(@Body() dto: CreateSportDto) {
    const created = this.data.sports.create({
      id: dto.slug,
      name: dto.name,
      slug: dto.slug,
    });
    this.audit.record({
      actorRole: 'AthleticStaff',
      action: 'create',
      entity: 'Sport',
      entityId: created.id,
    });
    return created;
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('AthleticStaff', 'Admin')
  update(@Param('id') id: string, @Body() dto: UpdateSportDto) {
    const updated = this.data.sports.update(id, dto);
    this.audit.record({
      actorRole: 'AthleticStaff',
      action: 'update',
      entity: 'Sport',
      entityId: id,
    });
    return updated;
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('AthleticStaff', 'Admin')
  delete(@Param('id') id: string) {
    const ok = this.data.sports.delete(id);
    this.audit.record({
      actorRole: 'AthleticStaff',
      action: 'delete',
      entity: 'Sport',
      entityId: id,
    });
    return { ok };
  }
}
