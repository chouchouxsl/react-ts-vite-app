import React, { useEffect, useState } from 'react'
import { IconDelete, IconEye } from '@arco-design/web-react/icon'
import { Avatar, List, Message, Popconfirm } from '@arco-design/web-react'
import { getListAllApi, deleteActorItem } from '@/api'
import style from './style/index.module.less'
import { history } from '@/route'
import useLocale from '@/hooks/useLocale'

const AList: React.FC = () => {
    const t = useLocale()

    const [list, setList] = useState<any[]>([])

    useEffect(() => {
        getList()
    }, [])

    async function getList() {
        const res = await getListAllApi()
        console.log('res :>> ', res)
        setList(res)
    }

    const deleteItem = async (id: number) => {
        const res = await deleteActorItem({ id })
        console.log('🤪 res >>:', res)
        Message.success('删除成功')
        getList()
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
                                <Popconfirm
                                    title={t['list.delete.tips']}
                                    onOk={() => {
                                        deleteItem(item.id)
                                    }}
                                >
                                    <IconDelete />
                                </Popconfirm>
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
