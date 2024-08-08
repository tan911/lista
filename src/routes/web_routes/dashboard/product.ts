import { Router } from 'express'
import { getProductView } from '@controllers'
const route: Router = Router()

route.get('/', getProductView)

export default route
