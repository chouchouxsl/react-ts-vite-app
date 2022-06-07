import auth, { AuthParams } from '@/utils/authentication'

export type IRoutes = {
    path: string
    key: string
    name: string
    redirect?: string
    componentKey?: string
    component?: any
    // 当前页是否展示面包屑
    breadcrumb?: boolean
    // 当前路由是否渲染菜单项，为 true 的话不会在菜单中显示，但可通过路由地址访问。
    hidden?: boolean
    children?: IRoutes[]
} & AuthParams

export const defaultRoute = 'home'

export const routes: IRoutes[] = [
    {
        path: '/home',
        key: 'home',
        name: 'menu.home',
        componentKey: 'Home/index',
        breadcrumb: false
    },
    {
        path: '/list',
        key: 'list',
        name: 'menu.list',
        redirect: '/list/index',
        children: [
            {
                path: '/list/index',
                key: 'list/index',
                name: 'list.index',
                componentKey: 'List/index'
            },
            {
                path: '/list/detail/:id',
                key: 'list/detail',
                name: 'list.detail',
                componentKey: 'List/detail',
                breadcrumb: false,
                hidden: true
            }
        ]
    }
]
