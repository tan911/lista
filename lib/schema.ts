import { z } from 'zod'

const categoryValues = ['credit', 'cash'] as const

// This input schema is for adding credit
export const inputSchema = z.object({
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

export type InputSchema = z.infer<typeof inputSchema>

export const inputFieldSchema = (fieldName: keyof InputSchema, value: string) => {
    const strToNum = parseInt(value)
    const checkedValue = typeof strToNum === 'number' && fieldName === 'quantity' ? strToNum : value

    const singleFieldSchema = z.object({ [fieldName]: inputSchema.shape[fieldName] })
    return singleFieldSchema.safeParse({ [fieldName]: checkedValue })
}

// Sign schema
export const hasUppercase = /(?=.*[A-Z])/g
export const hasLowercase = /(?=.*[a-z])/g
export const hasNumber = /(?=.*\d)/g
export const hasSpecialChars = /(?=.*[!<>@#$%^&*])/g
export const greaterThanSevenChars = /^(?=.{8,})/g

const PasswordSchema = z
    .string()
    .min(1, { message: 'Password is a required field' })
    .min(7, { message: 'Password must be at least 8 characters' })
    .regex(hasLowercase, 'Password must contain at least 1 lowercase letter')
    .regex(hasUppercase, 'Password must contain at least 1 uppercase letter')
    .regex(hasNumber, 'Password must contain at least 1 number')
    .regex(hasSpecialChars, 'Password must contain at least 1 symbol')

export const SignUpSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is a required field',
    }),
    email: z
        .string()
        .min(1, {
            message: 'Email is a required field',
        })
        .email(),
    password: PasswordSchema,
})

// Login schema
export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: 'Email is required field',
        })
        .email(),
    password: z.string().min(1, { message: 'Password is a required field' }),
})

// Product schema
export const CreateProductSchema = z.object({
    name: z.string(),
    price: z.number().positive(),
})
