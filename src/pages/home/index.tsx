import React, { Component } from 'react'
import SvgIcon from '@/components/SvgIcon'
import AuthWarp from '@/components/AuthWarp'
import { Roles } from '@/enums/globalEnums'
import style from './style/index.module.less'

class Home extends Component {
    public socket: any

    status = {
        name: '首页'
    }

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
