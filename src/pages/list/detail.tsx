import React from 'react'
import { useParams } from 'react-router-dom'
interface RequestParams {
    id: string
}

const AListDetail: React.FC = () => {
    const params = useParams<RequestParams>()

    return <div>{params.id}</div>
}

export default AListDetail
