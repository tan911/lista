import type { Request, Response } from 'express'
import { transaction } from '../services'

export async function getOverview(req: Request, res: Response) {
    const revenue = await transaction.getRevenue()

    return res.status(200).render('pages/dashboard/overview_html', {
        styles: 'public/css/output.css',
        javascript: 'public/js/index.js',
        routeName: 'overview',
        url: req.originalUrl,
        showModal: false,
        revenue,
    })
}
export async function getOverviewModal(req: Request, res: Response) {
    // redirect to '/dashboard' path
    if (!req.query.show) {
        return res.redirect('/dashboard')
    }

    const revenue = await transaction.getRevenue()

    return res.status(200).render('pages/dashboard/overview_html', {
        styles: '../../public/css/output.css',
        javascript: '../../public/js/index.js',
        url: '/dashboard',
        routeName: 'overview',
        showModal: true,
        revenue,
    })
}

export async function getCustomerView(req: Request, res: Response) {
    return res.status(200).render('pages/dashboard/customer_html', {
        styles: '../public/css/output.css',
        javascript: '../public/js/index.js',
        routeName: 'customers',
        url: req.originalUrl,
        showModal: false,
    })
}
export async function getCustomerModal(req: Request, res: Response) {
    // redirect to 'dashboard/customers' path
    if (!req.query.show) {
        return res.redirect('/dashboard/customers')
    }

    return res.status(200).render('pages/dashboard/customer_html', {
        styles: '../../public/css/output.css',
        javascript: '../../public/js/index.js',
        routeName: 'customers',
        url: '/dashboard/customers',
        showModal: true,
    })
}

export async function getTransactionView(req: Request, res: Response) {
    return res.status(200).render('pages/dashboard/transaction_html', {
        styles: '../public/css/output.css',
        javascript: '../../public/js/index.js',
        routeName: 'transactions',
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
        routeName: 'transactions',
        url: '/dashboard/transactions',
        showModal: true,
    })
}
