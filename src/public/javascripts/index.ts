import { CreditModal } from './controllers/add-credit/modal'
import { NavigationBar } from './controllers/navigation'

function init() {
    new CreditModal('add-credit-modal')
    new NavigationBar('navbar')
}

init()
