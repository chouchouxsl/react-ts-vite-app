import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import Setteing from '@/components/Navbar/setteing'
import GroundGlassbg from '@/components/GroundGlassbg'
import checkLogin from '@/utils/checkLogin'
import LoginForm from './form'
import styles from './style/index.module.less'
import type { FC } from 'react'

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
            <div className={styles['banner-warp']}>
                <GroundGlassbg height="100vh" blur="4px" />
            </div>
            <div className={styles['form-warp']}>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login
