import { AuthService } from './auth_service'
import { apiServerCall } from './api'

export const authService = new AuthService(apiServerCall())
