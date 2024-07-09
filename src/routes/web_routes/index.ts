import { Router } from 'express'

import dashboardRouter from './dashboard'
import authRouter from './auth'

const route: Router = Router()

route.use('/auth', authRouter)
route.use('/dashboard', dashboardRouter)

export default route
