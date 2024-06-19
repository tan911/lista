import { prisma } from '../../db'
import { TransactionService } from './transaction'

export const transaction = new TransactionService(prisma)
