import { getFetch } from '@/utils/request'

export const getUserInfoApi = <T = any>(params?: T) => getFetch({ url: '/userinfo', params })
