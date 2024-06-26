import { PrismaClient } from '@prisma/client'
export class CustomerService {
    constructor(private prisma: PrismaClient) {}

    public async get() {
        // count customer
        return await this.prisma.user.count()
    }
}
