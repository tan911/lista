import { Controller } from '@hotwired/stimulus'
import { ZodError } from 'zod'
import { SignUpSchema } from '../schema/auth'
import { IAuthMessage } from './auth_message_controller'
import { user } from '../services'

export default class SignupController extends Controller<HTMLFormElement> {
    static outlets = ['auth-message']
    static classes = ['loading']

    async submit(event: Event) {
        event.preventDefault()

        const data = new FormData(this.element)
        const dataSanitization = SignUpSchema.safeParse({
            name: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
        })

        try {
            if (dataSanitization.success) {
                this.loadingState(true)

                // send data to server
                const data = dataSanitization.data
                const response = await user.sync('signup', data)

                if (typeof response === 'string') {
                    // throw error validation failed on server side
                    throw response
                }
            } else {
                // throw error validation failed on client side
                throw dataSanitization.error
            }
        } catch (error: unknown | typeof ZodError | string) {
            if (error instanceof ZodError) {
                this.authMessageOutlets.forEach((toast: IAuthMessage, index: number) => {
                    toast.show(error.issues[index].message)
                })
            } else {
                this.authMessageOutlets.forEach((toast: IAuthMessage) => {
                    toast.show(error as string)
                })
            }
        } finally {
            this.loadingState(false)
        }
    }

    loadingState(status: boolean) {
        if (status) {
            this.element.querySelector('svg')?.classList.remove('hidden')
            this.element.querySelector('svg')?.classList.add(this.loadingClass)
            this.element.querySelector('span')?.classList.add('hidden')
        } else {
            this.element.querySelector('svg')?.classList.add('hidden')
            this.element.querySelector('span')?.classList.remove('hidden')
        }
    }

    declare readonly authMessageOutlets: IAuthMessage[]
    declare readonly loadingClass: string
}
