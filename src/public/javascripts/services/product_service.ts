import { AxiosInstance, isAxiosError } from 'axios'

export class ProductService {
    constructor(private api: AxiosInstance) {}

    async create(data: { name: string; price: number }) {
        try {
            await this.api.post('/api/v1/product', data)
        } catch (err) {
            if (isAxiosError(err)) {
                console.error(err)
            }
        }
    }
}
