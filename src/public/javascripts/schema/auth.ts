import { z } from 'zod'

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
