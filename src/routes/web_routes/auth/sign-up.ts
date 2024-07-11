import { Router } from 'express'

import { getSignUpView } from '../../../controllers'
const route: Router = Router()

route.get('/', getSignUpView)
route.post('/')

export default route
