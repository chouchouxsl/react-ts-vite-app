import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import checkLogin from '@/utils/checkLogin'
import type { RouteProps } from 'react-router-dom'

const AuthRoute: React.FC<RouteProps> = props => {
    const { path, component, location } = props
    /* 在这里可以写一些基于路由守卫的代码 */
    window.scroll(0, 0)
    if (!checkLogin()) {
        return <Redirect to={{ pathname: '/login', state: { redirect: location?.pathname || '/' } }} />
    }
    return <Route component={component} path={path} />
}

export default AuthRoute
