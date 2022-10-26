import React, { useRef, useState } from 'react'
import { Button, Form, Input } from '@arco-design/web-react'
import { IconLock, IconUser } from '@arco-design/web-react/icon'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { loginApi } from '@/api/login'
import { history } from '@/route'
import { getUserInfoApi } from '@/api/user'
import { setPageTitle } from '@/utils/set-page-title'
import useLocale from '@/hooks/useLocale'
import GroundGlassbg from '@/components/GroundGlassbg'
import styles from './style/index.module.less'
import type { IUser } from '@/redux/reducers/userInfo'
import type { FormInstance } from '@arco-design/web-react'
import type { FC } from 'react'

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
        } catch {
            setLoaing(false)
        }
    }
    return (
        <div className={styles['form-content']}>
            <GroundGlassbg height="100%" blur="4px" radius="8px" className={styles['form-content']}>
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
            </GroundGlassbg>
        </div>
    )
}

export default loginForm
