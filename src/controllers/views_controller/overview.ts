import type { Request, Response } from 'express'
import { routes } from '../../utils/route_util'
import { transaction, customer } from '../../services'

export async function getOverview(req: Request, res: Response) {
    const revenue = await transaction.getRevenue()
    const customers = await customer.get()

    return res.status(200).render('pages/dashboard/overview_html', {
        routes,
        current_route: 'overview',
        url: req.originalUrl,
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
        revenue,
        count: customers.customerCount,
    })
}
