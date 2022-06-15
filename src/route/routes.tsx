import { IconDashboard, IconList } from '@arco-design/web-react/icon'
import { Roles } from '@/enums/globalEnums'

export type IRoutes = {
    key: string
    name: string
    redirect?: string
    params?: string[]
    activePath?: string
    icon?: React.ReactNode
    component?: React.ComponentType<any>
    // 当前页是否展示面包屑
    breadcrumb?: boolean
    // 当前路由是否渲染菜单项，为 true 的话不会在菜单中显示，但可通过路由地址访问。
    hidden?: boolean
    // 只有在这个数组中的角色 才能访问 不设置的话 默认所有角色都可以访问
    roles?: Roles[]
    children?: IRoutes[]
}

export const routes: IRoutes[] = [
    {
        key: 'home/index',
        name: 'menu.home',
        icon: <IconDashboard />,
        breadcrumb: false
    },
    {
        key: 'list',
        name: 'menu.list',
        redirect: 'list/index',
        icon: <IconList />,
        roles: [Roles.ADMIN, Roles.MEMBER],
        children: [
            {
                key: 'list/index',
                name: 'list.index',
                children: [
                    {
                        key: 'list/detail',
                        name: 'list.detail',
                        params: ['id'],
                        activePath: 'list/index',
                        hidden: true
                    }
                ]
            }
        ]
    }
]

export const useRoutes = (role: Roles) => {
    const authRoutes = routes.filter(route => {
        // 如果没有设置 roles 则默认所有角色都可以访问 admin可以访问所有路由
        if (!route.roles || role === Roles.ADMIN) {
            return true
        }
        if (route.roles.includes(role)) {
            return true
        }
        return false
    })

    const defaultRoute = authRoutes[0].key || ''

    return [authRoutes, defaultRoute] as [IRoutes[], string]
}
