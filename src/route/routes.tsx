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
        componentKey: 'Home'
    },
    {
        path: '/list',
        key: 'list',
        name: 'menu.list',
        exact: false,
        icon: <IconSelectAll />,
        children: [
            {
                path: '/list/page1',
                key: 'list/page1',
                name: 'list1',
                componentKey: 'List'
            }
        ]
    }
]
