export const meta = {
    title: 'Dashboard',
    description:
        'Lista Dashboard: View and manage customer accounts, credits, and transactions effortlessly.',
}

export const routes = [
    {
        name: 'overview',
        path: '/web/dashboard',
        label: 'Overview',
    },
    {
        name: 'customers',
        path: '/web/dashboard/customers',
        label: 'Customers',
    },
    {
        name: 'transactions',
        path: '/web/dashboard/transactions',
        label: 'Transactions',
    },
]
