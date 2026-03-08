import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(dto: CreateProductDto): Promise<{
        name: string;
        code: string;
        price: number;
        quantity: number;
        category: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        name: string;
        code: string;
        price: number;
        quantity: number;
        category: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    search(query: string): Promise<{
        name: string;
        code: string;
        price: number;
        quantity: number;
        category: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        code: string;
        price: number;
        quantity: number;
        category: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, dto: UpdateProductDto): Promise<{
        name: string;
        code: string;
        price: number;
        quantity: number;
        category: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        name: string;
        code: string;
        price: number;
        quantity: number;
        category: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
