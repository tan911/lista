import { CreditModal, NavigationBar, Auth } from './controllers'

function init() {
    new CreditModal('add-credit-modal')
    new NavigationBar('navbar')
    new Auth('auth-page')
}

init()
