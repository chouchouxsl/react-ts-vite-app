import React, { FC, useState } from 'react'
import LoginForm from './form'
import Setteing from './setteing'
import styles from './style/index.module.less'

const Login: FC = () => {
    return (
        <div className={styles['app-container']}>
            <Setteing />
            <div className={styles['banner-warp']} />
            <div className={styles['form-warp']}>
                <LoginForm />
            </div>
        </div>
    )
}

export default Login
