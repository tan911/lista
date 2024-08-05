import { AuthService } from './auth_service'
import { apiServerCall } from './api'

export const user = new AuthService(apiServerCall())
