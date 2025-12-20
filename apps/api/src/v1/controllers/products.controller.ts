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
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

import { AuthGuard } from '../../auth/auth.guard';
import { Roles } from '../../auth/roles';
import { RolesGuard } from '../../auth/roles.guard';
import { AuditService } from '../../audit/audit.service';
import { V1DataService } from '../v1.data.service';

class CreateProductDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(0)
  priceCents!: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsBoolean()
  inStock?: boolean;
}

class UpdateProductDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  priceCents?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsBoolean()
  inStock?: boolean;
}

@Controller('/v1/products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(
    private readonly data: V1DataService,
    private readonly audit: AuditService,
  ) {}

  @Get()
  list() {
    return this.data.products.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.data.products.get(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('StoreManager', 'Admin')
  create(@Body() dto: CreateProductDto) {
    const created = this.data.products.create({
      title: dto.title,
      description: dto.description,
      priceCents: dto.priceCents,
      currency: dto.currency ?? 'USD',
      sku: dto.sku,
      inStock: dto.inStock ?? true,
    });
    this.audit.record({
      actorRole: 'StoreManager',
      action: 'create',
      entity: 'Product',
      entityId: created.id,
    });
    return created;
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('StoreManager', 'Admin')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const updated = this.data.products.update(id, dto as any);
    this.audit.record({
      actorRole: 'StoreManager',
      action: 'update',
      entity: 'Product',
      entityId: id,
    });
    return updated;
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('StoreManager', 'Admin')
  delete(@Param('id') id: string) {
    const ok = this.data.products.delete(id);
    this.audit.record({
      actorRole: 'StoreManager',
      action: 'delete',
      entity: 'Product',
      entityId: id,
    });
    return { ok };
  }
}
