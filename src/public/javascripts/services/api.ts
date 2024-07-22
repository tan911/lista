import axios from 'axios'

export function apiServerCall() {
    const token = localStorage.getItem('session')

    const apiQueryIntance = axios.create({
        baseURL: 'http://localhost:3000',
    })

    apiQueryIntance.interceptors.request.use(
        async function (reqConfig) {
            reqConfig.headers.set({
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            })
            return reqConfig
        },
        function (error) {
            return Promise.reject(error)
        }
    )

    apiQueryIntance.interceptors.response.use(
        function (resConfig) {
            return resConfig
        },
        function (error) {
            return Promise.reject(error)
        }
    )

    return apiQueryIntance
}
