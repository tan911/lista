import type { Request, Response } from 'express'
const meta = {
    title: 'Login',
    description: 'Login or sign up to lista to manage your sari-sari store efficiently.',
}
export async function getLoginView(req: Request, res: Response) {
    return res.render('pages/auth/index_html', {
        route: 'login',
        meta_data: { ...meta, url: req.protocol + '://' + req.get('host') + req.originalUrl },
    })
}
