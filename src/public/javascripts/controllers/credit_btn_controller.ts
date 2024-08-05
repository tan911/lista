import { Controller } from '@hotwired/stimulus'
import { IAddCredit } from './add_credit_controller'

export default class CreditBtn extends Controller<HTMLButtonElement> {
    static outlets = ['add-credit']
    open() {
        this.addCreditOutlet.show()
    }

    declare readonly addCreditOutlet: IAddCredit
}
