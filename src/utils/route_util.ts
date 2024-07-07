import { PanelsTopLeft, Users, ArrowLeftRight } from 'lucide-static'

export const routes = [
    { name: 'overview', path: '/dashboard', label: 'Overview', icon: PanelsTopLeft },
    { name: 'customers', path: '/dashboard/customers', label: 'Customers', icon: Users },
    {
        name: 'transactions',
        path: '/dashboard/transactions',
        label: 'Transactions',
        icon: ArrowLeftRight,
    },
]
