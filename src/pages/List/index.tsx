import React, { useEffect, useState } from 'react'
import { getListApi, addListApi } from '@/api'
import style from './style/index.module.less'

const List: React.FC = () => {
    const [list, setList] = useState<any[]>([])

    useEffect(() => {
        getList()
    }, [])

    async function getList() {
        const res = await getListApi<{ id?: number }>({})
        console.log('res :>> ', res)
        setList(res)
    }

    return (
        <div className={style.pages}>
            {list?.map(x => (
                <div key={x.id}>
                    <div className={style.name}>{x.name}</div>
                    <img src={x.avatar} className={style.avatar} alt="" />
                    <ul className={style.warp}>
                        {x.works.map((item: any) => (
                            <li
                                key={item.id}
                                className={style.item}
                                onClick={() => window.open(`http://javdb.com${item.href}`)}
                            >
                                <div>{item.title}</div>
                                <img src={item.cover} alt="" />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default List
