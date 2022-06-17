import React, { FC } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import LoginForm from './form'
import Setteing from '@/components/Navbar/setteing'
import styles from './style/index.module.less'
import checkLogin from '@/utils/checkLogin'

const Login: FC = () => {
    const { state } = useLocation()

    if (checkLogin()) {
        return <Redirect to={(state as any)?.redirect} />
    }

    return (
        <div className={styles['app-container']}>
            <ul className={styles['app-setteing']}>
                <Setteing />
            </ul>
            <div className={styles['banner-warp']} />
            <div className={styles['form-warp']}>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login
