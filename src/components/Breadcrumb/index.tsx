import React from 'react'
import { Breadcrumb as Bread } from '@arco-design/web-react'
import { IconRight } from '@arco-design/web-react/icon'

const BreadItem = Bread.Item

const Breadcrumb = () => {
    return (
        <Bread separator={<IconRight />}>
            <BreadItem>Home</BreadItem>
            <BreadItem>Channel</BreadItem>
            <BreadItem>News</BreadItem>
        </Bread>
    )
}

export default Breadcrumb
