import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/api/list',
        method: 'get',
        response: ({ query }: any) => {
            if (query.id === '1') {
                return {
                    code: 0,
                    'data|1-10': [
                        {
                            'id|+1': 1
                        }
                    ],
                    message: '请求成功',
                    type: 'success'
                }
            }
            return {
                code: -1,
                data: null,
                message: '请求失败',
                type: 'error'
            }
        }
    },
    {
        url: '/api/add-list',
        method: 'post',
        timeout: 2000,
        response: (data: any) => {
            console.log('data :>> ', data)
            return {
                code: 0,
                message: '添加成功',
                data: null,
                type: 'success'
            }
        }
        // rawResponse: async (req, res) => {
        //     let reqbody = ''
        //     await new Promise(resolve => {
        //         req.on('data', chunk => {
        //             reqbody += chunk
        //         })
        //         req.on('end', () => resolve(undefined))
        //     })
        //     res.setHeader('Content-Type', 'text/plain')
        //     res.statusCode = 200
        //     res.end(`hello, ${reqbody}`)
        // }
    }
] as MockMethod[]
