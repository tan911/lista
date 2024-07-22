import debounce from 'debounce'
import { SignUpSchema, LoginSchema } from '../schema/auth'
import { authService } from '../services'
import { Toast } from './toast'

export class Auth {
    private element: HTMLElement
    private checked: () => void
    private formIsSubmitted: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any

    constructor(public id: string) {
        this.toast = new Toast('auth-message')
        this.element = document.getElementById(id) as HTMLElement
        this.checked = debounce(this.allowToSubmit, 300)
        this.formIsSubmitted = false
        if (this.element) {
            this.element.onclick = this.onEvent.bind(this)
        }
    }

    public login() {
        const form = this.element.querySelector('form') as HTMLFormElement

        if (!this.formIsSubmitted) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault()
                const data = new FormData(form)
                const dataFormat = {
                    email: data.get('email'),
                    password: data.get('password'),
                }

                const validatedData = LoginSchema.safeParse(dataFormat)

                if (validatedData.success) {
                    const response = await authService.sync('login', validatedData.data)

                    if (typeof response === 'string') {
                        this.toast.show(response)
                    }
                } else {
                    this.toast.show(validatedData.error.issues[0].message)
                }
            })

            this.formIsSubmitted = true
        }
    }

    public signup() {
        const form = this.element.querySelector('form') as HTMLFormElement

        if (!this.formIsSubmitted) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault()
                const data = new FormData(form)
                const dataFormat = {
                    name: data.get('username'),
                    email: data.get('email'),
                    password: data.get('password'),
                }

                const validatedData = SignUpSchema.safeParse(dataFormat)

                if (validatedData.success) {
                    const response = await authService.sync('signup', validatedData.data)

                    if (typeof response === 'string') {
                        this.toast.show(response)
                    }
                } else {
                    this.toast.show(validatedData.error.issues[0].message)
                }
            })

            this.formIsSubmitted = true
        }
    }

    public checkFormFields() {
        const parent = document.getElementById(this.id) as HTMLElement
        const form = parent.querySelector('form') as HTMLFormElement
        const inputs = form.querySelectorAll('input')
        const button = form.querySelector('button')

        for (const input of inputs) {
            if (input.value.trim() === '' && input.hasAttribute('required') && button) {
                button.disabled = true
                return
            }
        }

        if (button) button.disabled = false
        return
    }

    public allowToSubmit() {
        const parent = document.getElementById(this.id) as HTMLElement
        const form = parent.querySelector('form') as HTMLFormElement
        const inputs = form.querySelectorAll('input')

        for (const input of inputs) {
            input.addEventListener('input', () => this.checkFormFields())
        }
    }

    private onEvent(event: Event) {
        const target = event.target as HTMLElement
        const action = target.dataset.actionAccount
        this.checked()

        if (target.matches('button') && action) {
            this[action]()
        }
    }
}
