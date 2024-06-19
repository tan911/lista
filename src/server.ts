import app from './app'
import { createLogger } from '../lib/logger'

const logger = createLogger('debug')
const port = 3000

process.on('unhandledRejection', (error) => {
    logger.error(`Unhandled Rejection: ${error}`)
})

process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error}`)
})

const server = app.listen(port, () => {
    logger.info(`Server running at \t\thttp:localhost:${port}`)
})

server.on('error', (err) => logger.error('App failed to start from server.ts', err))
