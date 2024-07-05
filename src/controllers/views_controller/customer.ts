import type { Request, Response } from 'express'

import { customer, transaction } from '../../services'

const routes = [
    { name: 'overview', path: '/dashboard', label: 'Overview' },
    { name: 'customers', path: '/dashboard/customers', label: 'Customers' },
    {
        name: 'transactions',
        path: '/dashboard/transactions',
        label: 'Transactions',
    },
]

export async function getCustomerView(req: Request, res: Response) {
    const customers = await customer.get()

    return res.render('pages/dashboard/customer_html', {
        routes,
        current_route: 'customers',
        url: req.originalUrl,
        customers: customers.customer,
    })
}

export async function getCustomerModal(req: Request, res: Response) {
    const customers = await customer.get()

    // redirect to 'dashboard/customers' path
    if (req.query.show !== 'true') {
        return res.redirect('/dashboard/customers')
    }

    return res.render('pages/dashboard/customer_html', {
        routes,
        current_route: 'customers',
        url: '/dashboard/customers',
        customers: customers.customer,
    })
}

export async function getCustomerById(req: Request, res: Response) {
    //TODO: validation for id before making in database
    const customerProfile = await customer.getById(req.params.id)
    const transactionHistory = await transaction.getByCustomerId(req.params.id)

    // query
    const tab = req.query.tab === 'transaction-history' ? req.query.tab : undefined

    return res.render('customers/profile_html', {
        routes,
        current_route: 'customers',
        profile: customerProfile,
        tab_content: tab,
        url_tab: req.path,
        transactions: transactionHistory,
    })
}
