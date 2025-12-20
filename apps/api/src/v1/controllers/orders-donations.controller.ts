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
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

import { AuthGuard } from '../../auth/auth.guard';
import { Roles } from '../../auth/roles';
import { RolesGuard } from '../../auth/roles.guard';
import { AuditService } from '../../audit/audit.service';
import { V1DataService } from '../v1.data.service';

class CreateOrderDonationDto {
  @IsString()
  kind!: string;

  @IsInt()
  @Min(0)
  amountCents!: number;

  @IsOptional()
  @IsString()
  currency?: string;
}

class UpdateOrderDonationDto {
  @IsOptional()
  @IsString()
  status?: string;
}

@Controller('/v1/orders-donations')
@UseGuards(AuthGuard)
export class OrdersDonationsController {
  constructor(
    private readonly data: V1DataService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  list() {
    return this.data.ordersDonations.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.data.ordersDonations.get(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('StoreManager', 'Admin')
  create(@Body() dto: CreateOrderDonationDto) {
    const created = this.data.ordersDonations.create({
      kind: dto.kind as any,
      createdAtIso: new Date().toISOString(),
      amountCents: dto.amountCents,
      currency: dto.currency ?? 'USD',
      status: 'Pending',
    });
    this.audit.record({
      actorRole: 'StoreManager',
      action: 'create',
      entity: 'OrderDonation',
      entityId: created.id,
    });
    return created;
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('StoreManager', 'Admin')
  update(@Param('id') id: string, @Body() dto: UpdateOrderDonationDto) {
    const updated = this.data.ordersDonations.update(id, dto as any);
    this.audit.record({
      actorRole: 'StoreManager',
      action: 'update',
      entity: 'OrderDonation',
      entityId: id,
    });
    return updated;
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('StoreManager', 'Admin')
  delete(@Param('id') id: string) {
    const ok = this.data.ordersDonations.delete(id);
    this.audit.record({
      actorRole: 'StoreManager',
      action: 'delete',
      entity: 'OrderDonation',
      entityId: id,
    });
    return { ok };
  }
}
