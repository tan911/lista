import { transaction } from './../services'

export class TransactionController {
    async getUserTransaction(id: string) {
        return await transaction.get('clxhllgxe00008aty1lvp8t3o')
    }

    async getTransactionById(id: string) {
        return await transaction.getById(id)
    }
}
