import { Router } from 'express'

import loginRouter from './login'
import signinRouter from './sign-up'

const route = Router()

route.use('/login', loginRouter)
route.use('/signin', signinRouter)

export default route
