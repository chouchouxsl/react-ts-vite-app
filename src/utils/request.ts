import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from '@arco-design/web-react'
import settings from '@/settings.json'
import { history } from '@/route'
import fetchErrorStatus from '@/utils/fetchErrorStatus'
import { ContentTypeEnum, RequestEnum, ResultCodeEnum } from '@/enums/requsetEnums'

interface Result<T = any> {
    code: ResultCodeEnum
    type?: 'success' | 'error' | 'warning'
    message: string
    data: T
}

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
                this.isShowNprogress && nprogress.start()

                const token = localStorage.getItem('token')
                if (token) {
                    config.headers!.token = token
                }

                return config
            },
            error => {
                Message.error(error)
                nprogress.done()
            }
        )

        // 全局响应拦截
        this.instance.interceptors.response.use(
            res => {
                nprogress.done()
                // res为AxiosResponse类型，含有config\data\headers\request\status\statusText属性
                const data = res.data
                // 改造返回的数据类型，即将AxiosResponse的data返回
                return data && data.code !== ResultCodeEnum.ERROR
                    ? data.data
                    : Promise.reject(data.message || '请求失败')
            },
            error => {
                nprogress.done()
                const { data, status } = error.response
                const msg = fetchErrorStatus(status)

                if (data.code === ResultCodeEnum.UNAUTHORIZED) {
                    history.replace({ pathname: '/login', state: { redirect: history.location?.pathname || '/' } })
                }
                return Promise.reject(data.message || msg)
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
                    Message.error(err || '请求错误')
                    reject(err)
                })
        })
    }

    get<T = any>(config: AxiosRequestConfig<T> = {}): Promise<T> {
        return this.request<T>({
            ...config,
            headers: {
                'Content-Type': ContentTypeEnum.FORM_URLENCODED
            },
            method: RequestEnum.GET
        })
    }

    post<T = any>(config: AxiosRequestConfig<T> = {}): Promise<T> {
        return this.request<T>({
            headers: {
                'Content-Type': ContentTypeEnum.JSON
            },
            ...config,
            method: RequestEnum.POST
        })
    }
}

const newAxios = new NewAxios(config, settings.isShowNprogress)

export const getFetch = newAxios.get.bind(newAxios)

export const postFetch = newAxios.post.bind(newAxios)

export type { AxiosInstance, AxiosRequestConfig, AxiosResponse, Result }

export default newAxios
