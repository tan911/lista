import type { Request, Response } from 'express'
import { routes, meta } from '@utils'

export async function getTransactionView(req: Request, res: Response) {
    return res.status(200).render('pages/dashboard/transaction_html', {
        routes,
        current_route: 'transactions',
        url: req.originalUrl,
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

export async function getTransactionModal(req: Request, res: Response) {
    if (req.query.show !== 'true') {
        return res.redirect('/web/dashboard/transactions')
    }

    return res.status(200).render('pages/dashboard/transaction_html', {
        routes,
        current_route: 'transactions',
        url: '/web/dashboard/transactions',
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
