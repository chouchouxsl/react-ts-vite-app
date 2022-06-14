import React, { FC, useRef, useState } from 'react'
import { Form, Input, FormInstance, Button } from '@arco-design/web-react'
import { IconLock, IconUser } from '@arco-design/web-react/icon'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styles from './style/index.module.less'
import { loginApi } from '@/api/login'
import { IUser } from '@/redux/reducers/userInfo'
import { history } from '@/route'
import { getUserInfoApi } from '@/api/user'
import { setPageTitle } from '@/utils/set-page-title'
import useLocale from '@/hooks/useLocale'

const loginForm: FC = () => {
    const formRef = useRef<FormInstance>(null)
    const [loading, setLoaing] = useState(false)
    const dispatch = useDispatch()
    const { state } = useLocation()

    const t = useLocale()

    setPageTitle(t['login.login'])

    const onSubmit = async () => {
        try {
            setLoaing(true)
            const val = await formRef.current?.validate()
            const { token } = await loginApi<{ token: string }>(val)
            await dispatch({
                type: 'add-token',
                payload: { token }
            })
            const userInfo: IUser = await getUserInfoApi()
            await dispatch({
                type: 'update-user',
                payload: { userInfo }
            })

            setLoaing(false)

            history.push((state as any)?.redirect || '/')
        } catch (error) {
            setLoaing(false)
            console.log('error :>> ', error)
        }
    }
    return (
        <div className={styles['form-content']}>
            <div className={styles['form-title']}>{t['login.title']}</div>
            <div className={styles['form-sub-title']}>{t['login.subTitle']}</div>
            <Form className={styles['form-info']} layout="vertical" ref={formRef}>
                <Form.Item field="username" rules={[{ required: true, message: t['login.username.placeholder'] }]}>
                    <Input
                        prefix={<IconUser />}
                        placeholder={t['login.username.placeholder']}
                        onPressEnter={onSubmit}
                    />
                </Form.Item>
                <Form.Item field="password" rules={[{ required: true, message: t['login.password.placeholder'] }]}>
                    <Input.Password
                        prefix={<IconLock />}
                        placeholder={t['login.password.placeholder']}
                        onPressEnter={onSubmit}
                    />
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} type="primary" onClick={onSubmit} long>
                        {t['login.login']}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default loginForm
