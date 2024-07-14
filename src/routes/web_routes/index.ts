import { Router } from 'express'
import { validateAuthSession } from '@middlewares'

import dashboardRouter from './dashboard'
import authRouter from './auth'

const route: Router = Router()

route.use('/auth', authRouter)
route.use('/dashboard', validateAuthSession, dashboardRouter)

export default route
