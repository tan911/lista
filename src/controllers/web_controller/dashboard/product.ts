import type { Request, Response } from 'express'
import { routes, meta } from '@utils'
import { product } from '@services'

export async function getProductView(req: Request, res: Response) {
    const userId = res.locals && res.locals.user ? res.locals.user.id : ''
    const products = await product.get(userId)

    return res.render('pages/dashboard/product_html', {
        routes,
        current_route: 'products',
        products,
        url: req.originalUrl,
        header: {
            link_to: '#',
            link_label: 'not_a_label',
            is_button: 'false',
        },
        meta_data: {
            ...meta,
            url: req.protocol + '://' + req.get('host') + req.originalUrl,
        },
    })
}
