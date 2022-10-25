import { postFetch } from '@/utils/request'

export const loginApi = <T = any>(data?: T) => postFetch({ url: '/login', data })
