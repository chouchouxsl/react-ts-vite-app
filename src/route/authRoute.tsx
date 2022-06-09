import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import checkLogin from '@/utils/checkLogin'

const AuthRoute: React.FC<RouteProps> = props => {
    const { path, component, location } = props
    console.log('🤪 path >>:', props, path, location?.pathname)
    /* 在这里可以写一些基于路由守卫的代码 */
    if (!checkLogin()) {
        return <Redirect to={{ pathname: '/login', state: { redirect: location?.pathname || '/' } }} />
    }
    return <Route component={component} path={path} />
}

export default AuthRoute
