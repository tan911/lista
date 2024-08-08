import { Router } from 'express'

import customerRouter from './customer'
import overviewRouter from './overvew'
import transationRouter from './transaction'
import productRouter from './product'
import { logout } from '@controllers'

const route: Router = Router()

route.use('/', overviewRouter)

route.use('/customers', customerRouter)

route.use('/transactions', transationRouter)

route.use('/products', productRouter)

route.post('/logout', logout)

export default route
