import { Router } from 'express'
import { endpoint } from '@controllers'
import { CreateProductSchema } from '@lib'

const route: Router = Router()

route.get(
    '/',
    endpoint.create({
        input: undefined,
        output: async ({ ctx }) => {
            return await ctx.product.get(ctx.user?.id as string)
        },
    })
)

route.post(
    '/',
    endpoint.create({
        input: CreateProductSchema,
        output: async ({ ctx, req }) => {
            await ctx.product.create(ctx.user?.id as string, req.body)
        },
    })
)

export default route
