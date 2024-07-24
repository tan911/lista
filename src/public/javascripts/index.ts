import { CreditModal, NavigationBar, Auth, Dropdown } from './controllers'

function init() {
    new CreditModal('add-credit-modal')
    new NavigationBar('navbar')
    new Auth('auth-page')
    new Dropdown('user-profile')
}

init()
