import { Controller } from '@hotwired/stimulus'
import { product } from '../services'
import { CreateProductSchema } from '../schema/product'
import { IToast } from './toast_controller'

export interface IAddProduct {
    show: () => void
}

export default class AddProduct extends Controller<HTMLDialogElement> {
    static classes = ['show']
    static outlets = ['toast']

    connect() {
        document.addEventListener('DOMContentLoaded', () => {
            if (new URL(document.location.toString()).searchParams.get('modal')) {
                this.show()
            }
        })
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            this.focus(e)
        })
    }

    disconnect(): void {
        document.removeEventListener('DOMContentLoaded', () => {})
        document.removeEventListener('keydown', (e: KeyboardEvent) => {
            this.focus(e)
        })
    }

    show() {
        this.element.classList.add(this.showClass)
        this.element.showModal()
        if (new URL(document.location.toString()).searchParams.get('modal')) {
            return
        } else {
            history.pushState({}, '', `${window.location.href}?modal=true`)
        }
    }

    close() {
        this.element.classList.remove(this.showClass)
        this.element.close()
        history.pushState({}, '', window.location.pathname)
    }

    async add() {
        const form = this.element.querySelector('form')
        const data = new FormData(form as HTMLFormElement)

        const dataSanization = CreateProductSchema.safeParse({
            name: data.get('name'),
            price: Number(data.get('price')),
        })

        try {
            if (dataSanization.success) {
                this.loader(true)
                await product.create(dataSanization.data)
            } else {
                throw dataSanization.error
            }

            setTimeout(() => {
                this.loader(false)
                this.toastOutlet.show('Product created') // TODO
            }, 500)
        } catch (error) {
            console.error(error)
        }
    }

    loader(status: boolean) {
        if (status) {
            this.element.querySelector('.loader')?.classList.remove('hidden')
            this.element.querySelector('span')?.classList.add('hidden')
        } else {
            this.element.querySelector('.loader')?.classList.add('hidden')
            this.element.querySelector('span')?.classList.remove('hidden')
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
    declare readonly toastOutlet: IToast
}
