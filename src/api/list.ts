import { getFetch, postFetch } from '@/utils/request'

export const getListApi = <T = any>(params?: T) => getFetch({ url: '/list', params })

export const deleteActorItemApi = <T = any>(data?: T) => postFetch({ url: '/douban/list/delete', data })
