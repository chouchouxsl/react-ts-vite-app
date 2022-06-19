import { getFetch, postFetch } from '@/utils/request'

export const getListAllApi = <T = any>(params?: T) => getFetch({ url: '/javdb/list/all', params })

export const getListByIdApi = <T = any>(params?: T) => getFetch({ url: '/javdb/list', params })

export const getWorksByIdApi = <T = any>(params?: T) => getFetch({ url: '/javdb/list/works', params })

export const getWorksInfoApi = <T = any>(params?: T) => getFetch({ url: '/javdb/list/find-works-info', params })

export const crawlingActorListApi = <T = any>(data?: T) => postFetch({ url: '/javdb/list/crawling-actor-list', data })

export const crawlingWorksAllApi = <T = any>(data?: T) => postFetch({ url: '/javdb/list/crawling-all-info', data })

export const crawlingWorksListApi = <T = any>(data?: T) => postFetch({ url: '/javdb/list/crawling-works-info', data })

export const deleteActorItemApi = <T = any>(data?: T) => postFetch({ url: '/javdb/list/delete', data })
