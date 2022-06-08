import React, { Component } from 'react'
import style from './style/index.module.less'
import SvgIcon from '@/components/SvgIcon'

class Home extends Component {
    componentDidMount() {}

    componentDidUpdate() {}

    componentWillUnmount() {}

    render() {
        return (
            <div className={style.pages}>
                <SvgIcon name="dark" color="red" /> 首页
            </div>
        )
    }
}

export default Home
