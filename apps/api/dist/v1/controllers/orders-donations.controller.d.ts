import { AuditService } from '../../audit/audit.service';
import { V1DataService } from '../v1.data.service';
declare class CreateOrderDonationDto {
    kind: string;
    amountCents: number;
    currency?: string;
}
declare class UpdateOrderDonationDto {
    status?: string;
}
export declare class OrdersDonationsController {
    private readonly data;
    private readonly audit;
    constructor(data: V1DataService, audit: AuditService);
    list(): {
        status: "Canceled" | "Pending" | "Paid" | "Refunded";
        id: string;
        currency: string;
        kind: "Order" | "Donation";
        createdAtIso: string;
        amountCents: number;
    }[];
    get(id: string): {
        status: "Canceled" | "Pending" | "Paid" | "Refunded";
        id: string;
        currency: string;
        kind: "Order" | "Donation";
        createdAtIso: string;
        amountCents: number;
    } | undefined;
    create(dto: CreateOrderDonationDto): {
        status: "Canceled" | "Pending" | "Paid" | "Refunded";
        id: string;
        currency: string;
        kind: "Order" | "Donation";
        createdAtIso: string;
        amountCents: number;
    };
    update(id: string, dto: UpdateOrderDonationDto): {
        status: "Canceled" | "Pending" | "Paid" | "Refunded";
        id: string;
        currency: string;
        kind: "Order" | "Donation";
        createdAtIso: string;
        amountCents: number;
    } | undefined;
    delete(id: string): {
        ok: boolean;
    };
}
export {};
