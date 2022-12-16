import axiosClient from './AxiosClient'
import { LoginPayload } from '@/models'

export const AuthApi = {
    login(payload: LoginPayload){
        return axiosClient.post('/rest/login',payload)
    }
}