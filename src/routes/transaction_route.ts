import { Router } from 'express'
import { endpoint } from './../controllers'

const router = Router()

router.get(
    '/',
    endpoint.create({
        input: undefined,
        output: async ({ ctx }) => {
            return await ctx.transaction.getUserTransaction(ctx.user?.id)
        },
    })
)

router.get(
    '/:id',
    endpoint.create({
        input: undefined,
        output: async ({ ctx, req }) => {
            return await ctx.transaction.getTransactionById(req.params.id)
        },
    })
)

export default router
