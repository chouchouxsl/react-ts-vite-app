import { getFetch, postFetch } from '@/utils/request'

export const getUserInfoApi = <T = any>(params?: T) => getFetch({ url: '/user', params })
