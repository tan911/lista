import { AxiosInstance, isAxiosError } from 'axios'

type TEnpoint = 'signup' | 'login'

type TUserCred = {
    name?: string
    email: string
    password: string
}

export class AuthService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
    constructor(private api: AxiosInstance) {}

    private async user(endpoint: TEnpoint, data: TUserCred) {
        if (!this.api) return
        try {
            const response = await this.api.post(`/web/auth/${endpoint}`, data)
            window.location.href = response.request.responseURL
        } catch (err) {
            if (isAxiosError(err)) {
                return err.response?.data.message
            }
        }
    }

    public async unsync() {
        if (!this.api) return

        try {
            const response = await this.api.post('/web/dashboard/logout')
            window.location.href = response.request.responseURL
        } catch (err) {
            if (isAxiosError(err)) {
                return err.response?.data.message
            }
        }
    }

    public async sync(type: TEnpoint, data: TUserCred): Promise<void | string> {
        const res = this.user(type, data)
        return res
    }
}
