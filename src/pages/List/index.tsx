import React, { useEffect, useState } from 'react'
import { Button } from '@arco-design/web-react'
import { getListApi, addListApi } from '@/api/common'

const List: React.FC = () => {
    const [list, setList] = useState<any[]>([])

    async function getList() {
        const res = await getListApi({ id: 1 })
        console.log('res :>> ', res)
        setList(res.data)
    }

    async function handlerAddList() {
        const res = await addListApi()
        console.log('res :>> ', res)
    }
    return (
        <>
            <div>
                <ul>
                    {list.map(item => (
                        <li key={item.id}>{item.id}</li>
                    ))}
                </ul>
            </div>
            <div>
                <Button onClick={getList}>获取列表</Button>
                <Button onClick={handlerAddList}>添加列表</Button>
            </div>
        </>
    )
}

export default List
