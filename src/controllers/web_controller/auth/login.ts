import type { Request, Response } from 'express'
import { verify } from '@node-rs/argon2'

import { LoginSchema } from '@lib'
import { prisma } from '@db'
import { lucia } from '@config'

const meta = {
    title: 'Login',
    description: 'Login or sign up to lista to manage your sari-sari store efficiently.',
}
export async function getLoginView(req: Request, res: Response) {
    return res.render('pages/auth/index_html', {
        route: 'login',
        meta_data: { ...meta, url: req.protocol + '://' + req.get('host') + req.originalUrl },
    })
}

export async function login(req: Request, res: Response) {
    const sanitized = await LoginSchema.safeParseAsync(req.body)

    if (!sanitized.success) {
        return res.status(400).json({ message: 'Invalid credentials' })
    }

    const { email, password } = sanitized.data

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })

    if (!existingUser) {
        return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isPasswordMatch = await verify(existingUser.password as string, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    })

    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid credentials' })
    }

    const session = await lucia.createSession(existingUser.id, {})
    const sessionCookie = await lucia.createSessionCookie(session.id).serialize()
    return res
        .appendHeader('Set-Cookie', sessionCookie)
        .appendHeader('Location', '/web/dashboard')
        .redirect(303, '/web/dashboard')
}
