import { Button } from '../button'
import { Dialog } from '../dialog'

export class DialogButton implements Button {
    private element: HTMLElement
    constructor(
        public id: string,
        public modal: Dialog
    ) {
        this.element = document.getElementById(id) as HTMLElement
        if (this.element) {
            this.element.onclick = this.onEvent.bind(this)
        }
    }

    public onEvent() {
        this.modal.open()
    }
}
