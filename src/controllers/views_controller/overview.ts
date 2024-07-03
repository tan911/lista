import type { Request, Response } from 'express'
import { transaction, customer } from '../../services'

const routes = [
    { name: 'overview', path: '/dashboard', label: 'Overview' },
    { name: 'customers', path: '/dashboard/customers', label: 'Customers' },
    {
        name: 'transactions',
        path: '/dashboard/transactions',
        label: 'Transactions',
    },
]

export async function getOverview(req: Request, res: Response) {
    const revenue = await transaction.getRevenue()
    const customers = await customer.get()

    return res.status(200).render('pages/dashboard/overview_html', {
        routes,
        current_route: 'overview',
        url: req.originalUrl,
        showModal: false,
        revenue,
        count: customers.customerCount,
    })
}
export async function getOverviewModal(req: Request, res: Response) {
    // redirect to '/dashboard' path
    if (req.query.show !== 'true') {
        return res.redirect('/dashboard')
    }

    const revenue = await transaction.getRevenue()
    const customers = await customer.get()

    return res.status(200).render('pages/dashboard/overview_html', {
        url: '/dashboard',
        routes,
        current_route: 'overview',
        showModal: true,
        revenue,
        count: customers.customerCount,
    })
}
