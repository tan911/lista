import type { Request, Response } from 'express'

export async function getOverview(req: Request, res: Response) {
    return res.status(200).render('dashboard/pages/overview_view', {
        cssPath: 'public/css/output.css',
        routeName: 'overview',
        url: req.originalUrl,
    })
}
export async function getOverviewModal(req: Request, res: Response) {
    return res.status(200).render('dashboard/add_credit_modal', {
        cssPath: '../../public/css/output.css',
        url: req.originalUrl,
        modalLayout: 'overview_view',
    })
}

export async function getCustomerView(req: Request, res: Response) {
    return res.status(200).render('dashboard/pages/customer_view', {
        cssPath: '../public/css/output.css',
        routeName: 'customers',
        url: req.originalUrl,
        modalLayout: 'customer_view',
    })
}
export async function getCustomerModal(req: Request, res: Response) {
    return res.status(200).render('dashboard/add_credit_modal', {
        cssPath: '../../public/css/output.css',
        routeName: 'customers',
        url: req.originalUrl,
        modalLayout: 'customer_view',
    })
}

export async function getTransactionView(req: Request, res: Response) {
    return res.status(200).render('dashboard/pages/transaction_view', {
        cssPath: '../public/css/output.css',
        routeName: 'transactions',
        url: req.originalUrl,
    })
}

export async function getTransactionModal(req: Request, res: Response) {
    return res.status(200).render('dashboard/add_credit_modal', {
        cssPath: '../../public/css/output.css',
        routeName: 'transactions',
        url: req.originalUrl,
        modalLayout: 'transaction_view',
    })
}
