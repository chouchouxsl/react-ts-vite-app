import { getFetch, postFetch } from '@/utils/request'

export const getListApi = <T = any>(params?: T) => getFetch({ url: '/api/javdb/list', params })

export const addListApi = <T = any>(data?: T) => postFetch({ url: '/api/javdb/add-list', data })
