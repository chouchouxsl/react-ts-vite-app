import { getFetch, postFetch } from '@/utils/request'

export const getListAllApi = <T = any>(params?: T) => getFetch({ url: '/javdb/list/all', params })

export const getListByIdApi = <T = any>(params?: T) => getFetch({ url: '/javdb/list', params })

export const addListApi = <T = any>(data?: T) => postFetch({ url: '/javdb/add-list', data })
