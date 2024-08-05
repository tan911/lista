import { Controller } from '@hotwired/stimulus'

export interface IAuthMessage {
    show: (message: string) => void
}

export default class AuthMessageController extends Controller<HTMLElement> {
    static timeoutId: number | null
    static classes = ['show', 'hide']

    show(message: string) {
        const el = this.element.querySelector('span')

        this.elementHidden()

        if (el) el.textContent = message
        this.element.classList.add(this.showClass)

        if (this.timeoutId !== null) {
            clearTimeout(this.timeoutId)
        }

        this.timeoutId = window.setTimeout(() => {
            this.element.classList.remove(this.showClass)
            this.element.classList.add(this.hideClass)
        }, 5000)
    }

    elementHidden() {
        if (this.hasHideClass) {
            this.element.classList.remove(this.hideClass)
        }
    }

    declare timeoutId: number | null
    declare readonly hasHideClass: boolean
    declare readonly hasShowClass: boolean
    declare readonly showClass: string
    declare readonly hideClass: string
}
