import type { Request, Response } from 'express'
import { routes, meta } from '@utils'

import { customer, transaction } from '@services'

export async function getCustomerView(req: Request, res: Response) {
    const customers = await customer.get()

    return res.render('pages/dashboard/customer_html', {
        routes,
        current_route: 'customers',
        url: req.originalUrl,
        customers: customers.customer,
        meta_data: {
            ...meta,
            url: req.protocol + '://' + req.get('host') + req.originalUrl,
        },
    })
}

export async function getCustomerModal(req: Request, res: Response) {
    const customers = await customer.get()

    if (req.query.show !== 'true') {
        return res.redirect('/web/dashboard/customers')
    }

    return res.render('pages/dashboard/customer_html', {
        routes,
        current_route: 'customers',
        url: '/web/dashboard/customers',
        customers: customers.customer,
        meta_data: {
            ...meta,
            url: req.protocol + '://' + req.get('host') + req.originalUrl,
        },
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
        meta_data: {
            ...meta,
            url: req.protocol + '://' + req.get('host') + req.originalUrl,
        },
    })
}
