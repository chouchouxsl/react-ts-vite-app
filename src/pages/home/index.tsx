import React, { Component } from 'react'
import { io } from 'socket.io-client'
import style from './style/index.module.less'
import SvgIcon from '@/components/SvgIcon'
import AuthWarp from '@/components/AuthWarp'
import { Roles } from '@/enums/globalEnums'

class Home extends Component {
    public socket: any

    status = {
        name: '首页'
    }

    socketConnect(url: string) {
        this.socket = io(url, { path: '/socket' })
        this.socket.on('enter', (data: any) => {
            console.log('🤪 enter >>:', data)
        })
        this.socket.on('enterName', (name: string) => {
            console.log('🤪 enterName >>:', name)
        })
        this.socket.on('message', (data: any) => {
            console.log('🤪 message >>:', data)
        })
        this.socket.on('name', (name: string) => {
            console.log('🤪 name >>:', name)
        })
        this.socket.on('leave', (data: any) => {
            console.log('🤪 leave >>:', data)
        })
    }

    componentDidMount() {
        this.socketConnect('ws://localhost:3345')
    }

    componentDidUpdate() {}

    componentWillUnmount() {}

    render() {
        return (
            <div className={style.pages} onClick={() => this.socket.emit('message', 'xxxxx')}>
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
