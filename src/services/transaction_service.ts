import { PrismaClient } from '@prisma/client'

export class TransactionService {
    constructor(private prisma: PrismaClient) {}

    public async get(userId: string) {
        return await this.prisma.transaction.findMany({
            where: {
                userId: userId,
            },
        })
    }

    public async getById(id: string) {
        return await this.prisma.transaction.findUnique({
            where: { id: id },
        })
    }

    public async getRevenue(id: string) {
        const [cash, credit] = await this.prisma.$transaction([
            this.prisma.transaction.findMany({
                where: {
                    userId: id,
                    transactionType: 'cash',
                },
            }),
            this.prisma.transaction.findMany({
                where: {
                    userId: id,
                    transactionType: 'credit',
                },
            }),
        ])

        const cashRevenue = cash.reduce((acc, curr) => acc + curr.totalAmount, 0)
        const creditRevenue = credit.reduce((acc, curr) => acc + curr.totalAmount, 0)

        return {
            cashRevenue,
            creditRevenue,
            totalRevenue: cashRevenue + creditRevenue,
        }
    }

    public async getByCustomerId(id: string) {
        return await this.prisma.transaction.findMany({
            where: {
                customerId: id,
            },
        })
    }
}
