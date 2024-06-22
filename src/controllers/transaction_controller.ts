import { transaction } from './../services'

export class TransactionController {
    async getUserTransaction(id = 'clxhllgxe00008aty1lvp8t3o') {
        return await transaction.get(id)
    }

    async getTransactionById(id: string) {
        return await transaction.getById(id)
    }
}
