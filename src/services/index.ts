import { prisma } from '../../db'
import { TransactionService } from './transaction'
import { CustomerService } from './customer'

export const transaction = new TransactionService(prisma)
export const customer = new CustomerService(prisma)
