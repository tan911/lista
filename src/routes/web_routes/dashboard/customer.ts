import { Router } from 'express'

import { getCustomerView, getCustomerModal, getCustomerById } from '@controllers'

const route: Router = Router()

route.get('/', getCustomerView)

route.get('/add-credit', getCustomerModal)

route.get('/:id', getCustomerById)

export default route
