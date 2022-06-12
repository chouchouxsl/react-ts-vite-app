import React, { useEffect, useState } from 'react'
import { IconDelete, IconEye } from '@arco-design/web-react/icon'
import { List, Message, Popconfirm } from '@arco-design/web-react'
import { getListAllApi, deleteActorItem } from '@/api'
import style from './style/index.module.less'
import { history } from '@/route'
import useLocale from '@/hooks/useLocale'
import LazyImg from '@/components/LazyImg'

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
                            <IconEye
                                onClick={() =>
                                    history.push({
                                        pathname: `/list/detail/${item.id}`
                                    })
                                }
                            />,
                            <Popconfirm
                                title={t['list.delete.tips']}
                                onOk={() => {
                                    deleteItem(item.id)
                                }}
                            >
                                <IconDelete />
                            </Popconfirm>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<LazyImg width={60} height={60} borderRadius={60} src={item.avatar} />}
                            title={item.name}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default AList
