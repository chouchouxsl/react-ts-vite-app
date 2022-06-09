import React, { useEffect, useState } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom'
import { Card } from '@arco-design/web-react'
import { getListApi, addListApi } from '@/api'
import './style/detail.module.less'
import { history } from '@/route'

const Meta = Card.Meta

const AListDetail: React.FC = () => {
    console.log('🤪 useRouteMatch >>:', useRouteMatch())

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
    const params = useParams()

    console.log('🤪params  >>:', params)
    useEffect(() => {
        getList()
    }, [])

    async function getList() {
        const res = await getListApi<{ id?: number }>({})
        console.log('res :>> ', res)
        // setList(res)
    }

    return (
        <div className="app-warp">
            {list.map((item, index) => (
                <Card
                    key={index}
                    hoverable
                    cover={
                        <div
                            style={{
                                height: 204,
                                overflow: 'hidden'
                            }}
                        >
                            <img
                                style={{ width: '100%', transform: 'translateY(-20px)' }}
                                alt="dessert"
                                src={item.cover}
                            />
                        </div>
                    }
                >
                    <Meta title={item.title} />
                </Card>
            ))}
        </div>
    )
}

export default AListDetail
