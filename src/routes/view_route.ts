import { Router } from 'express'
import {
    getOverview,
    getOverviewModal,
    getCustomerView,
    getCustomerModal,
    getTransactionModal,
    getTransactionView,
} from '../controllers'

const route: Router = Router()

route.get('/', getOverview)

route.get(`/add-credit`, getOverviewModal)

route.get('/customers', getCustomerView)

route.get('/customers/add-credit', getCustomerModal)

route.get('/transactions', getTransactionView)

route.get('/transactions/add-credit', getTransactionModal)

export default route
