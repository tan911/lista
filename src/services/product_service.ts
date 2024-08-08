import { PrismaClient } from '@prisma/client'
export class ProductService {
    constructor(private prisma: PrismaClient) {}

    async get(id: string) {
        return await this.prisma.product.findMany({
            skip: 0,
            take: 5,
            where: {
                userId: id,
            },
        })
    }

    async create(id: string, data: { name: string; price: number }) {
        await this.prisma.product.create({
            data: {
                userId: id,
                name: data.name,
                price: data.price,
            },
        })
    }
}
