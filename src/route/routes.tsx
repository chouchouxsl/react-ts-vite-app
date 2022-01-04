import { IconGift } from '@arco-design/web-react/icon'

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
    }
]
