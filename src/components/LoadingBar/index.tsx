import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { Progress } from '@arco-design/web-react'

const LoadingBar = (_: any, ref: any) => {
    // 用于清除定时器
    const loadingTimer = useRef<null | NodeJS.Timeout>(null)
    // 百分比
    const [percent, setPercent] = useState<number>(30)
    // 是否显示
    const [hide, setHide] = useState<boolean>(true)
    // loading状态
    function loading() {
        setHide(true)
        setPercent(30)
        loadingTimer.current = setInterval(() => {
            if (percent <= 98) {
                setPercent(percent > 80 ? percent + 1 : percent + 10)
            }
        })
    }
    // 成功状态
    function success() {
        clearInterval(loadingTimer.current as NodeJS.Timeout)
        setPercent(100)
        setTimeout(() => {
            setHide(false)
        }, 300)
    }

    // 将这两个方法 暴露给父组件调用
    useImperativeHandle(ref, () => ({
        loading,
        success
    }))

    return !hide ? (
        <Progress
            percent={percent}
            showText={false}
            animation
            style={{ position: 'absolute', height: 2, top: -1, zIndex: 9999 }}
        />
    ) : null
}

export default forwardRef(LoadingBar)
