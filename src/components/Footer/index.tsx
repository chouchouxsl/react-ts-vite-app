import React from 'react'
import { Layout } from '@arco-design/web-react'
import { useSelector } from 'react-redux'
import styles from './style/index.module.less'
import type { ReducerState } from '@/redux'
import type { FooterProps } from '@arco-design/web-react/es/Layout/interface'

const Footer = (props: FooterProps = {}) => {
    const { className, ...restProps } = props
    const settings = useSelector((state: ReducerState) => state.global.settings)

    return (
        <Layout.Footer className={[styles.footer, className as string]} {...restProps}>
            {settings?.title}
        </Layout.Footer>
    )
}

export default Footer
