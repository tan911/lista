import { Request, Response, NextFunction } from 'express'
import { verifyRequestOrigin, User, Session } from 'lucia'
import { lucia } from '../config/auth_config'

export function validateHeaders(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'GET') {
        return next()
    }

    const originHeader = req.headers.origin ?? null
    const hostHeader = req.headers.host ?? null

    console.log(originHeader, hostHeader)

    if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
        return res.status(403).json({ message: 'Forbidden Mesage' }).end()
    }
    return next()
}

export async function validateAuthSession(req: Request, res: Response, next: NextFunction) {
    const sessionId = lucia.readSessionCookie(req.headers.cookie ?? '')
    console.log(sessionId, '---session-id----')
    if (!sessionId) {
        res.locals.user = null
        res.locals.session = null
        return next()
    }

    const { session, user } = await lucia.validateSession(sessionId)

    console.log(session, user, '---session and user----')

    if (session && session.fresh) {
        res.appendHeader('Set-Cookie', lucia.createSessionCookie(session.id).serialize())
    }

    if (!session) {
        res.appendHeader('Set-Cookie', lucia.createBlankSessionCookie().serialize())
    }

    res.locals.user = user
    res.locals.session = session

    if (!res.locals.user || !res.locals.session) {
        console.log('Unauthorize!!!!')
        return res.status(401).json({
            message: 'Unauthorize',
        })
    }

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
