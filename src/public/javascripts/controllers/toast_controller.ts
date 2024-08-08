import { Controller } from '@hotwired/stimulus'

export interface IToast {
    show: (message: string) => void
}

export default class ToastController extends Controller<HTMLElement> {
    static toastId: number | null
    static classes = ['show']

    show(message: string) {
        const text = this.element.querySelector('span')

        if (text) text.textContent = message
        this.element.classList.add(this.showClass)

        if (this.toastId !== null) {
            clearTimeout(this.toastId)
        }

        this.toastId = window.setTimeout(() => {
            this.element.classList.remove(this.showClass)
        }, 5500)
    }

    declare readonly showClass: string
    declare toastId: number | null
}
