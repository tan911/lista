import winston from 'winston'

export function createLogger(level: string) {
    const transports = new winston.transports.Console({
        format:
            process.env.NODE_ENV !== 'production'
                ? winston.format.combine(winston.format.colorize(), winston.format.simple())
                : winston.format.json(),
    })

    return winston.createLogger({ level, transports })
}
