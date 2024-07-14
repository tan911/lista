import debounce from 'debounce'
import { SignUpSchema } from '../schema/auth'

export class Auth {
    private element: HTMLElement
    private checked: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any

    constructor(public id: string) {
        this.element = document.getElementById(id) as HTMLElement
        this.checked = debounce(this.allowToSubmit, 300)
        if (this.element) {
            this.element.onclick = this.onEvent.bind(this)
        }
    }

    public signup() {
        const form = this.element.querySelector('form') as HTMLFormElement
        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            const data = new FormData(form)
            const dataFormat = {
                username: data.get('username'),
                email: data.get('email'),
                password: data.get('password'),
            }

            const isValid = await SignUpSchema.safeParseAsync(dataFormat)
            console.log(isValid)
        })
    }

    public checkFormFields() {
        const parent = document.getElementById(this.id) as HTMLElement
        const form = parent.querySelector('form') as HTMLFormElement
        const inputs = form.querySelectorAll('input')

        for (const input of inputs) {
            if (input.value.trim() === '' && input.hasAttribute('required')) {
                return false
            }
        }

        return true
    }

    public allowToSubmit() {
        const parent = document.getElementById(this.id) as HTMLElement
        const form = parent.querySelector('form') as HTMLFormElement
        const button = form.querySelector('button')
        const isFilled = this.checkFormFields()

        if (button && isFilled) {
            button.disabled = false
        } else if (button) {
            button.disabled = true
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
