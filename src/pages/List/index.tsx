import React, { useEffect } from 'react'
import { getList } from '@/api/common'

const List: React.FC = () => {
    useEffect(() => {
        getList({})
    }, [])
    return <div>list</div>
}

export default List
