import React from 'react'
import { Layout } from '@arco-design/web-react'
import { FooterProps } from '@arco-design/web-react/es/Layout/interface'
import { useSelector } from 'react-redux'
import styles from './style/index.module.less'
import { ReducerState } from '@/redux'

const Footer = Layout.Footer

export default (props: FooterProps = {}) => {
    const { className, ...restProps } = props
    const settings = useSelector((state: ReducerState) => state.global.settings)

    return (
        <Footer className={[styles.footer, className as string]} {...restProps}>
            {settings?.title}
        </Footer>
    )
}
