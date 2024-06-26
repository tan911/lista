import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import { createLogger } from '../lib/logger'
import { transactionRouter, viewRouter } from './routes'
import { errorHandler, errorNotFoundHandler } from './middlewares/error_middleware'

const app = express()
const logger = createLogger('verbose')

// Templating engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Static files
app.use(express.static('dist'))

// Parse incoming requests data
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Logger
app.use(
    morgan('dev', {
        stream: {
            write: (message) => {
                logger.http(message.trim())
            },
        },
    })
)

// Views routes
app.use('/dashboard', viewRouter)

// Api routes
app.use('/api/v1/transactions', transactionRouter)

// Error handlers
app.use(errorNotFoundHandler)
app.use(errorHandler)

export default app
