import { Router } from 'express'

import customerRouter from './customer'
import overviewRouter from './overvew'
import transationRouter from './transaction'

const route: Router = Router()

route.use('/', overviewRouter)

route.use('/customers', customerRouter)

route.use('/transactions', transationRouter)

export default route
