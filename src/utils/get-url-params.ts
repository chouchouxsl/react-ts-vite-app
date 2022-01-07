// 仅用于线上预览，实际使用中可以将此逻辑删除
import qs from 'query-string'

export type ParamsType = Record<string, any>

export default function getUrlParams(url: string): ParamsType {
    const params: ParamsType = qs.parseUrl(url).query
    return params
}
