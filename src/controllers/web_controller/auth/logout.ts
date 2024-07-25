import type { Request, Response } from 'express'
import { lucia } from '@config'

export async function logout(req: Request, res: Response) {
    if (!res.locals.session) {
        return res.status(401).end()
    }

    await lucia.invalidateSession(res.locals.session.id)
    return res
        .setHeader('Set-Cookie', lucia.createBlankSessionCookie().serialize())
        .redirect(303, '/web/auth/login')
}
