import { SalesService } from '../sales/sales.service';
export declare class ReportsService {
    private readonly salesService;
    constructor(salesService: SalesService);
    getSalesReport(startDate: string, endDate: string): Promise<{
        startDate: string;
        endDate: string;
        totalSales: number;
        totalAmount: number;
        sales: {
            id: number;
            date: Date;
            total: number;
            items: {
                productName: string;
                productCode: string;
                quantity: number;
                unitPrice: number;
                subtotal: number;
            }[];
        }[];
    }>;
    generatePdf(startDate: string, endDate: string): Promise<Buffer>;
}
