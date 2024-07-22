import { PanelsTopLeft, Users, ArrowLeftRight, LogOut, Settings } from 'lucide-static'

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
        account: [
            { icon: Settings, name: 'Settings' },
            {
                icon: LogOut,
                name: 'Sign out',
            },
        ],
    },
    {
        name: 'customers',
        path: '/web/dashboard/customers',
        label: 'Customers',
        icon: Users,
        account: [
            { icon: Settings, name: 'Settings' },
            {
                icon: LogOut,
                name: 'Sign out',
            },
        ],
    },
    {
        name: 'transactions',
        path: '/web/dashboard/transactions',
        label: 'Transactions',
        icon: ArrowLeftRight,
        account: [
            { icon: Settings, name: 'Settings' },
            {
                icon: LogOut,
                name: 'Sign out',
            },
        ],
    },
]
