import React, { useEffect } from 'react'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { Spin } from '@arco-design/web-react'

const Nprogress: React.FC = () => {
    // 设置 false 关闭小圆圈
    nprogress.configure({ showSpinner: false })

    useEffect(() => {
        nprogress.start()

        return () => {
            nprogress.done()
        }
    }, [])

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100vh'
            }}
        >
            <Spin dot tip="加载中..." />
        </div>
    )
}

export default Nprogress
