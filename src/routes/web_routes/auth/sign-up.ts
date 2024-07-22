import { Router } from 'express'
import { getSignUpView, signUp } from '@controllers'

const route: Router = Router()

route.get('/', getSignUpView)

route.post('/', signUp)

export default route
