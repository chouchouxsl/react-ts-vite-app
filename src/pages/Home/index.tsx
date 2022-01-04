import React, { Component } from 'react'
import style from './style/index.module.less'
import { Button } from '@arco-design/web-react'

class Home extends Component {
    render() {
        return (
            <div className={style.pages}>
                <Button>哈哈</Button>
            </div>
        )
    }
}

export default Home
