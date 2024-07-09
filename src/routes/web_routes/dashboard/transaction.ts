import { Router } from 'express'

import { getTransactionView, getTransactionModal } from '../../../controllers'

const route: Router = Router()

route.get('/', getTransactionView)

route.get('/add-credit', getTransactionModal)

export default route
