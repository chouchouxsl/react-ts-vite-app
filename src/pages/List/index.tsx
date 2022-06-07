import React, { useEffect, useState } from 'react'
import { IconDelete, IconEye } from '@arco-design/web-react/icon'
import { Avatar, List } from '@arco-design/web-react'
import { getListApi, addListApi } from '@/api'
import style from './style/index.module.less'
import { history } from '@/route'

const AList: React.FC = () => {
    const [list, setList] = useState<any[]>([])

    useEffect(() => {
        // getList()
    }, [])

    async function getList() {
        const res = await getListApi<{ id?: number }>({})
        console.log('res :>> ', res)
        setList(res)
    }

    return (
        <div className="warp" style={{ padding: '20px' }}>
            <List
                className="list-demo-actions"
                style={{ width: '100%' }}
                dataSource={list}
                hoverable
                render={(item, index) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <span
                                className="list-demo-actions-icon"
                                onClick={() =>
                                    history.push({
                                        pathname: `/list/detail/${item.id}`
                                    })
                                }
                            >
                                <IconEye />
                            </span>,
                            <span className="list-demo-actions-icon">
                                <IconDelete />
                            </span>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar shape="square">
                                    <img alt="avatar" src={item.avatar} />
                                </Avatar>
                            }
                            title={item.name}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default AList
