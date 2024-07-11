import { Router } from 'express'

import loginRouter from './login'
import signupRouter from './sign-up'

const route = Router()

route.use('/login', loginRouter)
route.use('/signup', signupRouter)

export default route
