import React, { FC, useRef, useState } from 'react'
import { Form, Input, FormInstance, Button } from '@arco-design/web-react'
import { IconLock, IconUser } from '@arco-design/web-react/icon'
import { useDispatch } from 'react-redux'
import styles from './style/index.module.less'
import useLocale from '@/hooks/useLocale'
import { loginApi } from '@/api/login'
import { IUser } from '@/redux/reducers/userInfo'
import { history } from '@/route'

interface IResponse {
    token: string
    userInfo: IUser
}

const loginForm: FC = () => {
    const formRef = useRef<FormInstance>(null)
    const [loading, setLoaing] = useState(false)
    const dispatch = useDispatch()

    const locale = useLocale()

    const onSubmit = async () => {
        try {
            setLoaing(true)
            const val = await formRef.current?.validate()
            const { token, userInfo } = await loginApi<IResponse>(val)
            setLoaing(false)
            dispatch({
                type: 'add-token',
                payload: { token }
            })
            dispatch({
                type: 'update-user',
                payload: { userInfo }
            })
            history.push('/home')
        } catch (error) {
            setLoaing(false)
            console.log('error :>> ', error)
        }
    }
    return (
        <div className={styles['form-content']}>
            <div className={styles['form-title']}>{locale['login.title']}</div>
            <div className={styles['form-sub-title']}>{locale['login.subTitle']}</div>
            <Form className={styles['form-info']} layout="vertical" ref={formRef}>
                <Form.Item field="username" rules={[{ required: true, message: locale['login.username.placeholder'] }]}>
                    <Input
                        prefix={<IconUser />}
                        placeholder={locale['login.username.placeholder']}
                        onPressEnter={onSubmit}
                    />
                </Form.Item>
                <Form.Item field="password" rules={[{ required: true, message: locale['login.password.placeholder'] }]}>
                    <Input.Password
                        prefix={<IconLock />}
                        placeholder={locale['login.password.placeholder']}
                        onPressEnter={onSubmit}
                    />
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} type="primary" onClick={onSubmit} long>
                        {locale['login.login']}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default loginForm
