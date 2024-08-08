import { prisma } from '@db'
import { TransactionService } from './transaction_service'
import { CustomerService } from './customer_service'
import { ProductService } from './product_service'

export const transaction = new TransactionService(prisma)
export const customer = new CustomerService(prisma)
export const product = new ProductService(prisma)
