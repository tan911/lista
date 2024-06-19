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
}
