import { z } from 'zod'

const categoryValues = ['credit', 'cash'] as const

export const FormSchema = z.object({
    creditors: z
        .string()
        .min(1, {
            message: "Creditor's name is required",
        })
        .refine((val) => val.length <= 70, {
            message: "Creditor's name can't be more than 70 characters",
        }),
    email: z
        .string()
        .min(1, {
            message: 'Email is required',
        })
        .email(),
    products: z
        .string()
        .min(1, {
            message: "Product's name is required",
        })
        .refine((val) => val.length <= 20, {
            message: "Creditor's name can't be more than 20 characters",
        }),
    category: z.enum(categoryValues).default('credit'),
    quantity: z
        .number({
            required_error: 'Quantity is required',
            invalid_type_error: 'Please enter a number',
        })
        .positive({ message: '> 0 required' }),
    date: z.string().date(),
})

export type InputSchema = z.infer<typeof FormSchema>

export const inputFieldSchema = (fieldName: keyof InputSchema, value: string) => {
    const strToNum = parseInt(value)
    const checkedValue = typeof strToNum === 'number' && fieldName === 'quantity' ? strToNum : value

    const singleFieldSchema = z.object({ [fieldName]: FormSchema.shape[fieldName] })
    return singleFieldSchema.safeParse({ [fieldName]: checkedValue })
}
