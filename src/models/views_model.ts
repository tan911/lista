import { Customer, Transaction } from '../../db/index'

export type CustomerResource = {
    styles: string
    javascript: string
    routes: { name: string; path: string; label: string }
    current_route: string
    url: string
    showModal: boolean
    customers?: Customer
    transactotions?: Transaction
}
