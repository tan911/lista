import type { Request, Response } from 'express'

export async function getOverview(req: Request, res: Response) {
    return res.status(200).render('dashboard/pages/overview_view', {
        cssPath: 'public/css/output.css',
        jsPath: 'public/js/index.js',
        routeName: 'overview',
        url: req.originalUrl,
    })
}
export async function getOverviewModal(req: Request, res: Response) {
    // redirect to '/dashboard' path
    if (!req.query.show) {
        return res.redirect('/dashboard')
    }

    return res.status(200).render('dashboard/add_credit_modal', {
        cssPath: '../../public/css/output.css',
        jsPath: '../../public/js/index.js',
        url: req.originalUrl,
        modalLayout: 'overview_view',
        closeModalUrl: '/dashboard',
    })
}

export async function getCustomerView(req: Request, res: Response) {
    return res.status(200).render('dashboard/pages/customer_view', {
        cssPath: '../public/css/output.css',
        jsPath: '../public/js/index.js',
        routeName: 'customers',
        url: req.originalUrl,
        modalLayout: 'customer_view',
    })
}
export async function getCustomerModal(req: Request, res: Response) {
    // redirect to 'dashboard/customers' path
    if (!req.query.show) {
        return res.redirect('/dashboard/customers')
    }

    return res.status(200).render('dashboard/add_credit_modal', {
        cssPath: '../../public/css/output.css',
        jsPath: '../../public/js/index.js',
        routeName: 'customers',
        url: req.originalUrl,
        modalLayout: 'customer_view',
        closeModalUrl: '/dashboard/customers',
    })
}

export async function getTransactionView(req: Request, res: Response) {
    return res.status(200).render('dashboard/pages/transaction_view', {
        cssPath: '../public/css/output.css',
        jsPath: '../../public/js/index.js',
        routeName: 'transactions',
        url: req.originalUrl,
    })
}

export async function getTransactionModal(req: Request, res: Response) {
    // redirect to 'dashboard/transactions' path
    if (!req.query.show) {
        return res.redirect('/dashboard/transactions')
    }

    return res.status(200).render('dashboard/add_credit_modal', {
        cssPath: '../../public/css/output.css',
        jsPath: '../../public/js/index.js',
        routeName: 'transactions',
        url: req.originalUrl,
        modalLayout: 'transaction_view',
        closeModalUrl: '/dashboard/transactions',
    })
}
