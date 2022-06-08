import React, { Component } from 'react'
import style from './style/index.module.less'
import SvgIcon from '@/components/SvgIcon'
import AuthWarp from '@/components/AuthWarp'
import { Roles } from '@/enums/globalEnums'

class Home extends Component {
    componentDidMount() {}

    componentDidUpdate() {}

    componentWillUnmount() {}

    render() {
        return (
            <div className={style.pages}>
                <AuthWarp roles={[Roles.MEMBER]}>
                    <SvgIcon name="dark" color="red" />
                </AuthWarp>
                首页
            </div>
        )
    }
}

export default Home
