import { Router } from 'express'

import { getLoginView, login } from '@controllers'

const route: Router = Router()

route.get('/', getLoginView)
route.post('/', login)

export default route
