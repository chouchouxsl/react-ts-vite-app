import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { isShowNprogress } from '@/settings.json'
import fetchErrorStatus from '@/utils/fetchErrorStatus'

// 设置 false 关闭小圆圈
nprogress.configure({ showSpinner: false })

const baseURL = <string>import.meta.env.VITE_APP_API_BASEURL

const config = {
    baseURL,
    timeout: 30000,
    // 是否跨站点访问控制请求
    withCredentials: true
}

class NewAxios {
    instance: AxiosInstance

    isShowNprogress: boolean

    constructor(config: AxiosRequestConfig, isShowNprogress: boolean) {
        this.instance = axios.create(config)

        this.isShowNprogress = isShowNprogress

        // 全局请求拦截
        this.instance.interceptors.request.use(
            config => {
                // 请求时的进度条
                nprogress.start()
                console.log(config)
                return config
            },
            error => {
                nprogress.done()
                console.log('全局请求失败拦截', error)
            }
        )

        // 全局响应拦截
        this.instance.interceptors.response.use(
            res => {
                nprogress.done()
                // res为AxiosResponse类型，含有config\data\headers\request\status\statusText属性
                console.log(res)
                // 改造返回的数据类型，即将AxiosResponse的data返回
                return res.data
            },
            error => {
                nprogress.done()
                console.log('全局响应失败拦截')
                console.log(error.request)
                console.log(error.response)
                return error
            }
        )
    }

    request<T>(config: AxiosRequestConfig<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            this.instance
                .request<any, T>(config)
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    get<T = any>(config: AxiosRequestConfig<T> = {}): Promise<T> {
        return this.request<T>({
            ...config,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            method: 'GET'
        })
    }

    post<T = any>(config: AxiosRequestConfig<T> = {}): Promise<T> {
        return this.request<T>({
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            ...config,
            method: 'POST'
        })
    }
}

const newAxios = new NewAxios(config, isShowNprogress)

export const getFetch = newAxios.get.bind(newAxios)

export const postFetch = newAxios.post.bind(newAxios)

export type { AxiosInstance, AxiosRequestConfig, AxiosResponse }

export default newAxios
