import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getReport(startDate: string, endDate: string): Promise<{
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
    downloadPdf(startDate: string, endDate: string, res: any): Promise<void>;
}
