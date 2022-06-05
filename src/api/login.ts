import { getFetch, postFetch } from '@/utils/request'

export const loginApi = <T = any>(data?: T) => postFetch({ url: '/api/auth/login', data })
