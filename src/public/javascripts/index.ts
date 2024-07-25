import { CreditModal, NavigationBar, Auth, Dropdown, Header } from './controllers'

function init() {
    new Header('dashboard')
    new CreditModal('add-credit-modal')
    new NavigationBar('navbar')
    new Auth('auth-page')
    new Dropdown('user-profile')
}

init()
