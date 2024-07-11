import type { Request, Response, NextFunction } from 'express'
import { AppError, NotFoundError } from '@utils'
import { createLogger } from '@lib'

const logger = createLogger('verbose')

export function errorHandler(
    err: AppError | Error,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
) {
    logger.error(err.message)
    res.status(('httpCode' in err && err.httpCode) || 500).json({
        status: 'status' in err && err.status,
        message: err.message,
    })
}

export function errorNotFoundHandler(_req: Request, _res: Response, next: NextFunction) {
    next(new NotFoundError('Fail', 'Not Found', 404))
}
