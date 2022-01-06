import { getFetch, postFetch } from '@/utils/request'

export const getList = <T>(params: T) => getFetch({ url: '/api/list', params })

export const addList = <T>(data: T) => postFetch({ url: '/api/add-list', data })
