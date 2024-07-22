import type { Request, Response } from 'express'
import { routes, meta } from '@utils'
import { transaction, customer } from '@services'

export async function getOverview(req: Request, res: Response) {
    const revenue = await transaction.getRevenue()
    const customers = await customer.get()

    return res.status(200).render('pages/dashboard/overview_html', {
        routes,
        current_route: 'overview',
        url: req.originalUrl,
        revenue,
        count: customers.customerCount,
        header: {
            link_to: '#',
            link_label: 'Add credit',
            is_button: 'true',
        },
        meta_data: {
            ...meta,
            url: req.protocol + '://' + req.get('host') + req.originalUrl,
        },
    })
}
export async function getOverviewModal(req: Request, res: Response) {
    if (req.query.show !== 'true') {
        return res.redirect('/web/dashboard')
    }

    const revenue = await transaction.getRevenue()
    const customers = await customer.get()

    return res.status(200).render('pages/dashboard/overview_html', {
        url: '/web/dashboard',
        routes,
        current_route: 'overview',
        revenue,
        count: customers.customerCount,
        header: {
            link_to: '#',
            link_label: 'Add credit',
            is_button: 'true',
        },
        meta_data: {
            ...meta,
            url: req.protocol + '://' + req.get('host') + req.originalUrl,
        },
    })
}
