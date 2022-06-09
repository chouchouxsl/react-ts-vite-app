import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from '@arco-design/web-react'
import { IconFindReplace } from '@arco-design/web-react/icon'
import { getListByIdApi } from '@/api'
import './style/detail.module.less'

const Meta = Card.Meta

interface RequestParams {
    id: string
}

const AListDetail: React.FC = () => {
    const params = useParams<RequestParams>()

    const [list, setList] = useState<any[]>([
        {
            title: 'asdkadnaskdnajk',
            cover: 'https://raw.githubusercontent.com/chouchouxsl/photos/master/wallhaven-z8pyky.jpg'
        },
        {
            title: 'asdkadnaskdnajk',
            cover: 'https://raw.githubusercontent.com/chouchouxsl/photos/master/wallhaven-z8pyky.jpg'
        },
        {
            title: 'asdkadnaskdnajk',
            cover: 'https://raw.githubusercontent.com/chouchouxsl/photos/master/wallhaven-z8pyky.jpg'
        },
        {
            title: 'asdkadnaskdnajk',
            cover: 'https://raw.githubusercontent.com/chouchouxsl/photos/master/wallhaven-z8pyky.jpg'
        }
    ])

    useEffect(() => {
        getList()
    }, [])

    async function getList() {
        const res = await getListByIdApi<RequestParams>({ id: params?.id })
        console.log('res :>> ', res)
        // setList(res)
    }

    return (
        <div className="app-warp">
            {list.map((item, index) => (
                <Card
                    key={index}
                    cover={<img src={item.cover} />}
                    actions={[
                        <span className="icon-hover">
                            <IconFindReplace />
                        </span>
                    ]}
                >
                    <Meta title={item.title} />
                </Card>
            ))}
        </div>
    )
}

export default AListDetail
