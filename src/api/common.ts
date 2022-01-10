import { getFetch, postFetch } from '@/utils/request'

export const getListApi = <T = any>(params?: T) => getFetch({ url: '/api/list', params })

export const addListApi = <T = any>(data?: T) => postFetch({ url: '/api/add-list', data })
