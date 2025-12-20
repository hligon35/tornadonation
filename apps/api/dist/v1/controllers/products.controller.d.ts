import { AuditService } from '../../audit/audit.service';
import { V1DataService } from '../v1.data.service';
declare class CreateProductDto {
    title: string;
    description?: string;
    priceCents: number;
    currency?: string;
    sku?: string;
    inStock?: boolean;
}
declare class UpdateProductDto {
    title?: string;
    description?: string;
    priceCents?: number;
    currency?: string;
    sku?: string;
    inStock?: boolean;
}
export declare class ProductsController {
    private readonly data;
    private readonly audit;
    constructor(data: V1DataService, audit: AuditService);
    list(): {
        id: string;
        title: string;
        priceCents: number;
        currency: string;
        inStock: boolean;
        description?: string | undefined;
        sku?: string | undefined;
    }[];
    get(id: string): {
        id: string;
        title: string;
        priceCents: number;
        currency: string;
        inStock: boolean;
        description?: string | undefined;
        sku?: string | undefined;
    } | undefined;
    create(dto: CreateProductDto): {
        id: string;
        title: string;
        priceCents: number;
        currency: string;
        inStock: boolean;
        description?: string | undefined;
        sku?: string | undefined;
    };
    update(id: string, dto: UpdateProductDto): {
        id: string;
        title: string;
        priceCents: number;
        currency: string;
        inStock: boolean;
        description?: string | undefined;
        sku?: string | undefined;
    } | undefined;
    delete(id: string): {
        ok: boolean;
    };
}
export {};
