import { z } from 'zod'
export const CreateProductSchema = z.object({
    name: z.string(),
    price: z.number().positive(),
})
