import { PanelsTopLeft, Users, ArrowLeftRight } from 'lucide-static'

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
        icon: PanelsTopLeft,
    },
    {
        name: 'customers',
        path: '/web/dashboard/customers',
        label: 'Customers',
        icon: Users,
    },
    {
        name: 'transactions',
        path: '/web/dashboard/transactions',
        label: 'Transactions',
        icon: ArrowLeftRight,
    },
]
