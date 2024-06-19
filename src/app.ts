import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import { createLogger } from '../lib/logger'
import { transactionRouter } from './routes'
import { errorHandler, errorNotFoundHandler } from './middlewares/error_middleware'

const app = express()
const logger = createLogger('verbose')

// Templating engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Static files
app.use(express.static('public'))

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

// Api routes
app.use('/', (req, res) => {
    res.status(200).render('base')
})
app.use('/api/v1/transactions', transactionRouter)

// Error handlers
app.use(errorNotFoundHandler)
app.use(errorHandler)

export default app
