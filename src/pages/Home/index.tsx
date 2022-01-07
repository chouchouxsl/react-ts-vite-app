import React, { Component } from 'react'
import { Button } from '@arco-design/web-react'
import style from './style/index.module.less'
import { GlobalContext } from '@/context/globalContext'

class Home extends Component {
    componentDidMount() {}

    componentDidUpdate() {}

    componentWillUnmount() {}

    render() {
        return (
            <GlobalContext.Consumer>
                {ctx => (
                    <div className={style.pages}>
                        <Button>哈哈</Button>
                        <div>{ctx.locale!['menu.home']}</div>
                    </div>
                )}
            </GlobalContext.Consumer>
        )
    }
}

export default Home
