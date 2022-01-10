import React, { useEffect, useState } from 'react'
import { Button, Input } from '@arco-design/web-react'
import { getListApi, addListApi, Result } from '@/api'

const List: React.FC = () => {
    const [list, setList] = useState<any[]>([])
    const [id, setId] = useState<string>('1')

    useEffect(() => {
        getList()
    }, [])

    async function getList() {
        const res: Result = await getListApi<{ id: string }>({ id })
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
                <Input value={id} onChange={val => setId(val)} />
            </div>
            <div>
                <Button onClick={getList}>获取列表</Button>
                <Button onClick={handlerAddList}>添加列表</Button>
            </div>
        </>
    )
}

export default List
