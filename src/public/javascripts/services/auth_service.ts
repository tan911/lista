import { AxiosInstance, isAxiosError } from 'axios'

type LoginType = {
    email: string
    password: string
}

type SignupType = {
    name: string
    email: string
    password: string
}

export class AuthService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
    constructor(private api: AxiosInstance) {}

    public async login(data: LoginType): Promise<void | string> {
        if (!this.api) return
        try {
            await this.api.post('/web/auth/login', data)
        } catch (err) {
            if (isAxiosError(err)) {
                return err.response?.data.message
            }
        }
    }

    public async singup(data: SignupType): Promise<void | string> {
        if (!this.api) return
        try {
            await this.api.post('/web/auth/signup', data)
        } catch (err) {
            if (isAxiosError(err)) {
                return err.response?.data.message
            }
        }
    }

    public async sync(
        type: 'signup' | 'login',
        data: LoginType | SignupType
    ): Promise<void | string> {
        const res = this[type](data)
        return res
    }
}
