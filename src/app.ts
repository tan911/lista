import 'dotenv/config'
import 'module-alias/register'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

import { createLogger } from '@lib'
import { template } from '@utils'
import { transactionRouter, webRouter } from '@routes'
import {
    errorHandler,
    errorNotFoundHandler,
    validateAuthSession,
    validateHeaders,
} from '@middlewares'

const app = express()
const logger = createLogger('verbose')

// Ejs path views
app.locals.template = template

// Templating engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// enable proxies
app.set('trust proxy', true)

// Static files
app.use(express.static('dist'))

app.get('/', (req, res) => {
    return res.render('pages/home/landing_html')
})

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
