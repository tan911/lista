import { AuthService } from './auth_service'
import { ProductService } from './product_service'
import { apiServerCall } from './api'

export const user = new AuthService(apiServerCall())
export const product = new ProductService(apiServerCall())
