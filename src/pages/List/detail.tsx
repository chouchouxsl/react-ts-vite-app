import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getListApi, addListApi } from '@/api'
import style from './style/index.module.less'
import { history } from '@/route'

const AListDetail: React.FC = () => {
    const [list, setList] = useState<any[]>([])
    const params = useParams()

    console.log('🤪params  >>:', params)
    useEffect(() => {
        getList()
    }, [])

    async function getList() {
        const res = await getListApi<{ id?: number }>({})
        console.log('res :>> ', res)
        setList(res)
    }

    return (
        <div className="warp" style={{ padding: '20px' }}>
            11
        </div>
    )
}

export default AListDetail
