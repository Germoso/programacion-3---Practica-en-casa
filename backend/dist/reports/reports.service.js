"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const sales_service_1 = require("../sales/sales.service");
const PDFDocument = require('pdfkit');
let ReportsService = class ReportsService {
    salesService;
    constructor(salesService) {
        this.salesService = salesService;
    }
    async getSalesReport(startDate, endDate) {
        const sales = await this.salesService.findByDateRange(startDate, endDate);
        const totalSales = sales.length;
        const totalAmount = sales.reduce((sum, sale) => sum + Number(sale.total), 0);
        return {
            startDate,
            endDate,
            totalSales,
            totalAmount,
            sales: sales.map((sale) => ({
                id: sale.id,
                date: sale.date,
                total: Number(sale.total),
                items: sale.items.map((item) => ({
                    productName: item.productName,
                    productCode: item.productCode,
                    quantity: item.quantity,
                    unitPrice: Number(item.unitPrice),
                    subtotal: Number(item.subtotal),
                })),
            })),
        };
    }
    async generatePdf(startDate, endDate) {
        const report = await this.getSalesReport(startDate, endDate);
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument({ margin: 50, size: 'A4' });
            const buffers = [];
            doc.on('data', (chunk) => buffers.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(buffers)));
            doc.on('error', reject);
            doc
                .fontSize(22)
                .font('Helvetica-Bold')
                .text('Ferretería - Reporte de Ventas', { align: 'center' });
            doc.moveDown(0.5);
            doc
                .fontSize(11)
                .font('Helvetica')
                .text(`Período: ${startDate} al ${endDate}`, { align: 'center' });
            doc.moveDown(1);
            doc
                .fontSize(13)
                .font('Helvetica-Bold')
                .text('Resumen');
            doc.moveDown(0.3);
            doc
                .fontSize(11)
                .font('Helvetica')
                .text(`Total de ventas realizadas: ${report.totalSales}`)
                .text(`Monto total generado: RD$ ${report.totalAmount.toFixed(2)}`);
            doc.moveDown(1);
            doc
                .moveTo(50, doc.y)
                .lineTo(545, doc.y)
                .stroke();
            doc.moveDown(1);
            if (report.sales.length === 0) {
                doc
                    .fontSize(12)
                    .font('Helvetica')
                    .text('No se encontraron ventas en el período seleccionado.', {
                    align: 'center',
                });
            }
            else {
                doc
                    .fontSize(13)
                    .font('Helvetica-Bold')
                    .text('Detalle de Ventas');
                doc.moveDown(0.5);
                for (const sale of report.sales) {
                    const saleDate = new Date(sale.date).toLocaleDateString('es-DO', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    });
                    doc
                        .fontSize(11)
                        .font('Helvetica-Bold')
                        .text(`Venta #${sale.id} — ${saleDate} — Total: RD$ ${sale.total.toFixed(2)}`);
                    doc.moveDown(0.3);
                    const tableTop = doc.y;
                    doc
                        .fontSize(9)
                        .font('Helvetica-Bold');
                    doc.text('Producto', 60, tableTop, { width: 180 });
                    doc.text('Código', 240, tableTop, { width: 80 });
                    doc.text('Cant.', 320, tableTop, { width: 50, align: 'right' });
                    doc.text('P. Unit.', 380, tableTop, { width: 70, align: 'right' });
                    doc.text('Subtotal', 460, tableTop, { width: 70, align: 'right' });
                    doc.moveDown(0.3);
                    doc
                        .fontSize(9)
                        .font('Helvetica');
                    for (const item of sale.items) {
                        const y = doc.y;
                        doc.text(item.productName, 60, y, { width: 180 });
                        doc.text(item.productCode, 240, y, { width: 80 });
                        doc.text(String(item.quantity), 320, y, { width: 50, align: 'right' });
                        doc.text(`RD$ ${item.unitPrice.toFixed(2)}`, 380, y, {
                            width: 70,
                            align: 'right',
                        });
                        doc.text(`RD$ ${item.subtotal.toFixed(2)}`, 460, y, {
                            width: 70,
                            align: 'right',
                        });
                        doc.moveDown(0.3);
                    }
                    doc.moveDown(0.5);
                    if (doc.y > 700) {
                        doc.addPage();
                    }
                }
            }
            doc.moveDown(2);
            doc
                .fontSize(9)
                .font('Helvetica')
                .fillColor('#888888')
                .text(`Reporte generado el ${new Date().toLocaleDateString('es-DO')} — Sistema de Inventario para Ferretería`, { align: 'center' });
            doc.end();
        });
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sales_service_1.SalesService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map