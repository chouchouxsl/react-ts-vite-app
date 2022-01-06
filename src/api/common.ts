import { getFetch, postFetch } from '@/utils/request'

export const getListApi = <T>(params?: T) => getFetch({ url: '/api/list', params })

export const addListApi = <T>(data?: T) => postFetch({ url: '/api/add-list', data })
