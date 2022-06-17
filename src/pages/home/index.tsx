import React, { Component } from 'react'
import style from './style/index.module.less'
import SvgIcon from '@/components/SvgIcon'
import AuthWarp from '@/components/AuthWarp'
import { Roles } from '@/enums/globalEnums'

class Home extends Component {
    status = {
        name: '首页'
    }

    socketConnect(url: string) {
        // 客户端与服务器进行连接
        const ws = new WebSocket(url) // 返回`WebSocket`对象，赋值给变量ws
        // 连接成功回调
        ws.onopen = e => {
            console.log('连接成功', e)
            ws.send('我发送消息给服务端') // 客户端与服务器端通信
        }
        // 监听服务器端返回的信息
        ws.onmessage = e => {
            console.log('服务器端返回：', e.data)
            // do something
        }
        return ws // 返回websocket对象
    }

    componentDidMount() {
        this.socketConnect('ws://172.0.0.1:3345')
    }

    componentDidUpdate() {}

    componentWillUnmount() {}

    render() {
        return (
            <div className={style.pages}>
                <AuthWarp roles={[Roles.MEMBER]}>
                    <SvgIcon name="dark" color="red" />
                    status: {this.status.name}
                </AuthWarp>
                首页
            </div>
        )
    }
}

export default Home
