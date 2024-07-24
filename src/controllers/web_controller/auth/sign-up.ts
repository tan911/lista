import type { Request, Response } from 'express'
import { lucia } from '@config'
import { SignUpSchema } from '@lib'
import { hash } from '@node-rs/argon2'
import { prisma } from '@db'

const meta = {
    title: 'Login',
    description: 'Login or sign up to lista to manage your sari-sari store efficiently.',
}

export async function getSignUpView(req: Request, res: Response) {
    return res.render('pages/auth/index_html', {
        route: 'signup',
        meta_data: { ...meta, url: req.protocol + '://' + req.get('host') + req.originalUrl },
    })
}

// Sign up with email and password
export async function signUp(req: Request, res: Response) {
    const isValid = await SignUpSchema.safeParseAsync(req.body)

    if (!isValid.success) {
        return res.status(400).json(isValid.error)
    }

    const { name, email, password } = isValid.data

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })

    if (existingUser) {
        return res.status(400).json({ message: 'User already exist!' })
    }

    const hashedPassword = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    })

    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
        })

        const session = await lucia.createSession(user.id, {})
        const sessionCookie = await lucia.createSessionCookie(session.id)

        return res
            .appendHeader('Set-Cookie', sessionCookie.serialize())
            .redirect(303, '/web/dashboard')
    } catch (err) {
        console.log(err, 'errr')
        return res.status(500).json({ message: 'Something went wrong!' })
    }
}
