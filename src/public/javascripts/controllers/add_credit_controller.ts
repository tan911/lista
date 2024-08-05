import { Controller } from '@hotwired/stimulus'
import { FormSchema } from '../schema/credit'

export interface IAddCredit {
    show: () => void
    close: () => void
    openByKey: () => void
    closeByKey: () => void
}

// TODO: clicking outside the window should close the modal

export default class AddCredit extends Controller<HTMLDialogElement> {
    static classes = ['show']

    connect() {
        document.addEventListener('DOMContentLoaded', () => {
            if (new URL(document.location.toString()).searchParams.get('show')) {
                this.show()
            }
        })
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            this.closeByKey(e)
            this.openByKey(e)
            this.focus(e)
        })
    }

    disconnect(): void {
        document.removeEventListener('DOMContentLoaded', () => {})
        document.removeEventListener('keydown', (e: KeyboardEvent) => {
            this.closeByKey(e)
            this.openByKey(e)
            this.focus(e)
        })
    }

    add() {
        const form = this.element.querySelector('form')
        const data = new FormData(form as HTMLFormElement)
        const inputs = {
            creditors: data.get('creditors'),
            email: data.get('email'),
            products: data.get('products'),
            category: data.get('category'),
            quantity: data.get('quantity'),
            date: data.get('date'),
        }

        const parsedInputs = FormSchema.safeParse(inputs)
        console.log()
        if (parsedInputs.success) {
            //
        } else {
            // todo
            parsedInputs.error?.errors.forEach((err) => {
                console.log(err)
            })
        }
    }

    cancel() {
        // todo
        this.close()
    }

    show() {
        this.element.classList.add(this.showClass)
        this.element.showModal()

        if (new URL(document.location.toString()).searchParams.get('show')) {
            return
        } else {
            history.pushState({}, '', `${window.location.href}/add-credit?show=true`)
        }
    }

    close() {
        this.element.classList.remove(this.showClass)
        this.element.close()

        const paths = document.location.pathname.split('/')
        const secondLastRoutes = paths[paths.length - 2]

        const hasMainPath = ['customers', 'transactions'].includes(secondLastRoutes)
            ? `web/dashboard/${secondLastRoutes}`
            : `web/dashboard`

        window.history.replaceState({}, '', `${document.location.origin}/${hasMainPath}`)
    }

    openByKey(event: KeyboardEvent) {
        const params = new URL(document.location.toString()).searchParams
        if (event.ctrlKey && event.key === 'm') {
            if (params.get('show')) {
                return
            }
            this.show()
        }
    }

    closeByKey(event: KeyboardEvent) {
        const params = new URL(document.location.toString()).searchParams
        if (event.key === 'Escape' && params.get('show')) {
            this.close()
        }
    }

    focus(e: KeyboardEvent) {
        const isTabPressed = e.key === 'Tab'

        if (!isTabPressed) return

        const focusableElements =
            'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
        const firstFocusableElement = this.element.querySelectorAll(
            focusableElements
        )[0] as HTMLElement
        const focusableContent = this.element.querySelectorAll(focusableElements)
        const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement

        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus()
                e.preventDefault()
            }
        } else if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus()
            e.preventDefault()
        }
    }

    declare readonly showClass: string
}
