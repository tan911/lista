import { PrismaClient } from '@prisma/client'
export class CustomerService {
    constructor(private prisma: PrismaClient) {}

    public async get() {
        const customerCount = await this.prisma.customer.count()
        const customer = await this.prisma.customer.findMany({
            where: {
                userId: 'clxhllgxe00008aty1lvp8t3o', //test
            },
            include: {
                transactions: true,
                credits: true,
            },
        })

        return {
            customerCount,
            customer,
        }
    }

    public async getById(id: string) {
        return await this.prisma.customer.findUnique({
            where: {
                id: id,
            },
            include: {
                transactions: true,
                credits: true,
            },
        })
    }
}
