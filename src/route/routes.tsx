import { IconGift, IconSelectAll } from '@arco-design/web-react/icon'

export interface IRoutes {
    path: string
    key: string
    name: string
    componentKey?: string
    redirect?: string
    exact?: boolean
    icon?: any
    component?: any
    // 当前页是否展示面包屑
    breadcrumb?: boolean
    // 当前路由是否渲染菜单项，为 true 的话不会在菜单中显示，但可通过路由地址访问。
    ignore?: boolean
    children?: IRoutes[]
}

export const defaultRoute = 'home'

export const routes: IRoutes[] = [
    {
        path: '/home',
        key: 'home',
        name: 'menu.home',
        exact: true,
        icon: <IconGift />,
        componentKey: 'Home/index'
    },
    {
        path: '/list',
        key: 'list',
        exact: false,
        name: 'menu.list',
        icon: <IconSelectAll />,
        children: [
            {
                path: '/list/index',
                key: 'list/index',
                name: 'actor.list',
                componentKey: 'List/index'
            },
            {
                path: '/list/detail/:id',
                key: 'list/detail',
                name: 'actor.detail',
                componentKey: 'List/detail',
                ignore: true
            }
        ]
    }
]
