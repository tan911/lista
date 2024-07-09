import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import { createLogger } from '../lib/logger'
import { transactionRouter, webRouter } from './routes'
import { errorHandler, errorNotFoundHandler } from './middlewares/error_middleware'
import { validateHeaders, validateAuthSession } from './middlewares/auth_middleware'
import appLocals from './utils/app_local_util'

const app = express()
const logger = createLogger('verbose')

// Ejs path views
app.locals.template = appLocals

// Templating engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.set('trust proxy', true)

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

// App routes
app.use('/web', validateHeaders, webRouter)

// All routes defined after this will be protected
app.use('/api/v1', validateHeaders, validateAuthSession)

// Api routes
app.use('/api/v1/transactions', transactionRouter)

// Error handlers
app.use(errorNotFoundHandler)
app.use(errorHandler)

export default app
