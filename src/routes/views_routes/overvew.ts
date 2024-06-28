import { Router } from 'express'

import { getOverview, getOverviewModal } from '../../controllers'

const route: Router = Router()

route.get('/', getOverview)

route.get('/add-credit', getOverviewModal)

export default route
