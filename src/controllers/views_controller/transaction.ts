import type { Request, Response } from 'express'

const routes = [
    { name: 'overview', path: '/dashboard', label: 'Overview' },
    { name: 'customers', path: '/dashboard/customers', label: 'Customers' },
    { name: 'transactions', path: '/dashboard/transactions', label: 'Transactions' },
]

export async function getTransactionView(req: Request, res: Response) {
    return res.status(200).render('pages/dashboard/transaction_html', {
        styles: '../public/css/output.css',
        javascript: '../public/js/index.js',
        routes,
        current_route: 'transactions',
        url: req.originalUrl,
        showModal: false,
    })
}

export async function getTransactionModal(req: Request, res: Response) {
    // redirect to 'dashboard/transactions' path
    if (!req.query.show) {
        return res.redirect('/dashboard/transactions')
    }

    return res.status(200).render('pages/dashboard/transaction_html', {
        styles: '../../public/css/output.css',
        javascript: '../../public/js/index.js',
        routes,
        current_route: 'transactions',
        url: '/dashboard/transactions',
        showModal: true,
    })
}
