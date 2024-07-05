import type { Request, Response } from 'express'

const routes = [
    { name: 'overview', path: '/dashboard', label: 'Overview' },
    { name: 'customers', path: '/dashboard/customers', label: 'Customers' },
    {
        name: 'transactions',
        path: '/dashboard/transactions',
        label: 'Transactions',
    },
]

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
