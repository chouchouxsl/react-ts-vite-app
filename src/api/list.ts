import { getFetch, postFetch } from '@/utils/request'

export const getListAllApi = <T = any>(params?: T) => getFetch({ url: '/javdb/list/all', params })

export const getListByIdApi = <T = any>(params?: T) => getFetch({ url: '/javdb/list', params })

export const getWorksByIdApi = <T = any>(params?: T) => getFetch({ url: '/javdb/list/works', params })

export const crawlingInfoApi = <T = any>(data?: T) => postFetch({ url: '/javdb/list/crawling-info', data })

export const deleteActorItemApi = <T = any>(data?: T) => postFetch({ url: '/javdb/list/delete', data })
