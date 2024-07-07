import type { Request, Response } from 'express'
import { routes } from '../../utils/route_util'

export async function getTransactionView(req: Request, res: Response) {
    return res.status(200).render('pages/dashboard/transaction_html', {
        routes,
        current_route: 'transactions',
        url: req.originalUrl,
    })
}

export async function getTransactionModal(req: Request, res: Response) {
    // redirect to 'dashboard/transactions' path
    if (req.query.show !== 'true') {
        return res.redirect('/dashboard/transactions')
    }

    return res.status(200).render('pages/dashboard/transaction_html', {
        routes,
        current_route: 'transactions',
        url: '/dashboard/transactions',
    })
}
