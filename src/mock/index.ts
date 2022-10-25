import Mock, { Random } from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/api/login',
        method: 'post',
        timeout: 1000,
        response: (data: any) => {
            if (data.body?.username && data.body?.password) {
                if (data.body?.username === 'admin' && data.body?.password === 'admin') {
                    return {
                        code: 0,
                        message: '登陆成功',
                        data: {
                            token: '@string(50)'
                        },
                        type: 'success'
                    }
                } else {
                    return {
                        code: -1,
                        message: '账号或密码有误,请重新输入!',
                        data: null,
                        type: 'error'
                    }
                }
            }
            return {
                code: -1,
                message: '登陆失败',
                data: null,
                type: 'error'
            }
        }
    },
    {
        url: '/api/userinfo',
        method: 'get',
        timeout: 1000,
        response: (data: any) => {
            if (data.headers?.token) {
                return {
                    code: 0,
                    message: '登陆成功',
                    data: {
                        id: '@id',
                        username: 'R_h_zero',
                        avatar: 'https://avatars.githubusercontent.com/u/56704668?v=4',
                        location: '@county(true)',
                        role: 'admin'
                    },
                    type: 'success'
                }
            }
            return {
                code: -1,
                message: '获取用户信息失败',
                data: null,
                type: 'error'
            }
        }
    },
    {
        url: '/api/list',
        method: 'get',
        response: ({ query }: any) => {
            if (query) {
                return {
                    code: 0,
                    data: Mock.mock({
                        [`list|${query.pageSize}`]: [
                            {
                                id: '@id',
                                name: '@cname',
                                age: Random.integer(1, 100),
                                address: '@county',
                                avatar: Random.image('140x140', '#ecc', ' Actor '),
                                city: '@city',
                                province: '@province',
                                email: Random.email(),
                                phone: /^1\d{10}$/,
                                regin: '@region',
                                url: '@url',
                                date: Random.date('yyyy-MM-dd')
                            }
                        ]
                    }),
                    message: '请求成功',
                    type: 'success'
                }
            }
            return {
                code: -1,
                data: null,
                message: '获取列表失败',
                type: 'error'
            }
        }
    }
    // {
    //     url: '/api/add-list',
    //     method: 'post',
    //     timeout: 2000,
    //     response: (data: any) => {
    //         console.log('data :>>', data)
    //         return {
    //             code: 0,
    //             message: '添加成功',
    //             data: null,
    //             type: 'success'
    //         }
    //     }
    //     // rawResponse: async (req, res) => {
    //     //     let reqbody = ''
    //     //     await new Promise(resolve => {
    //     //         req.on('data', chunk => {
    //     //             reqbody += chunk
    //     //         })
    //     //         req.on('end', () => resolve(undefined))
    //     //     })
    //     //     res.setHeader('Content-Type', 'text/plain')
    //     //     res.statusCode = 200
    //     //     res.end(`hello, ${reqbody}`)
    //     // }
    // }
] as MockMethod[]
