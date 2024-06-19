export class AppError extends Error {
    constructor(
        public status: string,
        public message: string,
        public httpCode: number
    ) {
        super(message)
    }
}

export class NotFoundError extends AppError {
    constructor(
        public status: string,
        public message: 'Not Found',
        public httpCode = 404
    ) {
        super(status, message, httpCode)
    }
}
