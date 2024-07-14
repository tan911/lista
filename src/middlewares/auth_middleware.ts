import { Request, Response, NextFunction } from 'express'
import { verifyRequestOrigin, User, Session } from 'lucia'
import { lucia } from '../config/auth_config'

export function validateHeaders(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'GET') {
        return next()
    }

    const originHeader = req.headers.origin ?? null
    const hostHeader = req.headers.host ?? null

    if (
        !originHeader ||
        !hostHeader ||
        !verifyRequestOrigin(originHeader, [hostHeader, 'http://lista.com'])
    ) {
        return res.status(403).json({ message: 'Forbidden Mesage' }).end()
    }
    return next()
}

export async function validateAuthSession(req: Request, res: Response, next: NextFunction) {
    const sessionId = lucia.readSessionCookie(req.headers.cookie ?? '')

    if (!sessionId) {
        res.locals.user = null
        res.locals.session = null

        return res.status(401).json({
            message: 'Unauthorize',
        })
    }

    const { session, user } = await lucia.validateSession(sessionId)

    if (session && session.fresh) {
        res.appendHeader('Set-Cookie', lucia.createSessionCookie(session.id).serialize())
    }

    if (!session) {
        res.appendHeader('Set-Cookie', lucia.createBlankSessionCookie().serialize())
    }

    res.locals.user = user
    res.locals.session = session

    return next()
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Locals {
            user: User | null
            session: Session | null
        }
    }
}
