import { describe, it, expect } from 'vitest'
import { req, res } from '../__mocks__/index'
import { getCustomerView, getCustomerModal, getCustomerById } from '../../src/controllers'

const controllers = [getCustomerView, getCustomerModal, getCustomerById]

describe('controller', () => {
    it('should call render method', () => {
        controllers.map(async (getController) => {
            await getController(req, res)
            expect(res.render).toHaveBeenCalled()
        })
    })
})

// describe('controller modal', () => {
//     it('should call render method if show query is provided', async () => {
//         await getCustomerModal(req, res)
//         expect(res.render).toHaveBeenCalledWith('pages/dashboard/customer_html', expect.anything())
//         expect(res.redirect).not.toHaveBeenCalled()
//     })

//     it('should call redirect if show query is not provided', async () => {
//         req.query.show = undefined
//         await getCustomerModal(req, res)
//         expect(res.redirect).toHaveBeenCalled()
//     })
// })
