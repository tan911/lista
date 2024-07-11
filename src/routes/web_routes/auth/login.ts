import { Router } from 'express'

import { getLoginView } from '@controllers'

const route: Router = Router()

route.get('/', getLoginView)
route.post('/')

export default route
