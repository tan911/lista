import type { Request, Response, NextFunction } from 'express'
import { AppError, NotFoundError } from '../utils/error_util'
import { createLogger } from '../../lib/logger'

const logger = createLogger('verbose')

export function errorHandler(
    err: AppError | Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    logger.error(err.message)
    res.status(('httpCode' in err && err.httpCode) || 500).json({
        status: 'status' in err && err.status,
        message: err.message,
    })
}

export function errorNotFoundHandler(req: Request, res: Response, next: NextFunction) {
    next(new NotFoundError('Fail', 'Not Found', 404))
}
