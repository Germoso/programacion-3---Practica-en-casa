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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SalesService = class SalesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        let total = 0;
        const itemsData = [];
        for (const item of dto.items) {
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId },
            });
            if (!product) {
                throw new common_1.NotFoundException(`Producto con ID ${item.productId} no encontrado`);
            }
            if (product.quantity < item.quantity) {
                throw new common_1.BadRequestException(`Stock insuficiente para "${product.name}". Disponible: ${product.quantity}, solicitado: ${item.quantity}`);
            }
            const subtotal = product.price * item.quantity;
            total += subtotal;
            itemsData.push({
                productId: product.id,
                productName: product.name,
                productCode: product.code,
                unitPrice: product.price,
                quantity: item.quantity,
                subtotal,
            });
            await this.prisma.product.update({
                where: { id: product.id },
                data: { quantity: product.quantity - item.quantity },
            });
        }
        return this.prisma.sale.create({
            data: {
                total,
                items: {
                    create: itemsData,
                },
            },
            include: { items: true },
        });
    }
    async findAll() {
        return this.prisma.sale.findMany({
            include: { items: true },
            orderBy: { date: 'desc' },
        });
    }
    async findOne(id) {
        const sale = await this.prisma.sale.findUnique({
            where: { id },
            include: { items: true },
        });
        if (!sale) {
            throw new common_1.NotFoundException('Venta no encontrada');
        }
        return sale;
    }
    async findByDateRange(startDate, endDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        return this.prisma.sale.findMany({
            where: {
                date: { gte: start, lte: end },
            },
            include: { items: true },
            orderBy: { date: 'desc' },
        });
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SalesService);
//# sourceMappingURL=sales.service.js.map