import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
export declare class SalesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateSaleDto): Promise<{
        items: {
            quantity: number;
            id: number;
            productId: number;
            productName: string;
            productCode: string;
            unitPrice: number;
            subtotal: number;
            saleId: number;
        }[];
    } & {
        id: number;
        date: Date;
        total: number;
    }>;
    findAll(): Promise<({
        items: {
            quantity: number;
            id: number;
            productId: number;
            productName: string;
            productCode: string;
            unitPrice: number;
            subtotal: number;
            saleId: number;
        }[];
    } & {
        id: number;
        date: Date;
        total: number;
    })[]>;
    findOne(id: number): Promise<{
        items: {
            quantity: number;
            id: number;
            productId: number;
            productName: string;
            productCode: string;
            unitPrice: number;
            subtotal: number;
            saleId: number;
        }[];
    } & {
        id: number;
        date: Date;
        total: number;
    }>;
    findByDateRange(startDate: string, endDate: string): Promise<({
        items: {
            quantity: number;
            id: number;
            productId: number;
            productName: string;
            productCode: string;
            unitPrice: number;
            subtotal: number;
            saleId: number;
        }[];
    } & {
        id: number;
        date: Date;
        total: number;
    })[]>;
}
