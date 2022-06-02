import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// 使用时: <AuthRoute path="" component={...} />

const AuthRoute = ({ component: Component, ...rest }) => {
    // 标签传入的参数compoennt，并重命名Component
    return (
        <Route
            {...rest}
            render={props =>
                // 判断是否登录  在登录页面登录成功的时候把用户名保存到本地
                localStorage.getItem('isLogin') ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/logins', // 重定向到的网页位置
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
}

export default AuthRoute
