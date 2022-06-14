import React, { useEffect, useState } from 'react'
import { IconDelete, IconEye } from '@arco-design/web-react/icon'
import { Button, Form, Input, List, Message, Modal, Popconfirm, Spin } from '@arco-design/web-react'
import { getListAllApi, deleteActorItemApi, crawlingInfoApi } from '@/api'
import style from './style/index.module.less'
import { history } from '@/route'
import useLocale from '@/hooks/useLocale'
import LazyImg from '@/components/LazyImg'
import OperationHead from '@/components/OperationHead'

const AList: React.FC = () => {
    const t = useLocale()
    const [form] = Form.useForm()
    const [list, setList] = useState<any[]>([])
    const [isShowLoading, setLoading] = useState(false)
    const [isShowDialog, setShowDialog] = useState(false)

    useEffect(() => {
        // getList()
        console.log('🤪 form >>:', form)
    }, [])

    async function getList() {
        const res = await getListAllApi()
        console.log('res :>> ', res)
        setList(res)
    }

    const deleteItem = async (id: number) => {
        await deleteActorItemApi({ id })
        Message.success('删除成功')
        getList()
    }

    return (
        <>
            {isShowLoading && (
                <div className={style.mark}>
                    <Spin loading tip={`${t['list.dialog.btn.crawling']}...`} />
                </div>
            )}

            <div className="warp" style={{ padding: '20px' }}>
                <OperationHead
                    rightDOM={
                        <Button type="primary" size="large" onClick={() => setShowDialog(true)}>
                            {t['list.add-data']}
                        </Button>
                    }
                />
                <List
                    className="list-demo-actions"
                    style={{ width: '100%' }}
                    dataSource={list}
                    hoverable
                    render={item => (
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

            <Modal
                title={<div style={{ textAlign: 'left' }}> {t['list.add-data']} </div>}
                visible={isShowDialog}
                onOk={() => {
                    form.resetFields()
                    setShowDialog(false)
                }}
                onCancel={() => {
                    form.resetFields()
                    setShowDialog(false)
                }}
                autoFocus={false}
                focusLock
                style={{ width: '600px' }}
            >
                <Form size="large" form={form}>
                    <Form.Item
                        label={t['list.dialog.lebal.networkLink']}
                        labelCol={{ span: 5 }}
                        field="link"
                        rules={[
                            { required: true, message: t['list.dialog.lebal.networkLink.tips'] },
                            {
                                match: /^(https|http):\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
                                message: t['list.dialog.input.placeholder']
                            }
                        ]}
                    >
                        <Input.Search
                            searchButton={t['list.dialog.btn.crawling']}
                            placeholder={t['list.dialog.input.placeholder']}
                            loading={isShowLoading}
                            onSearch={async () => {
                                try {
                                    await form.validate()
                                    const { link: url } = form.getFields()
                                    setLoading(true)
                                    const res = await crawlingInfoApi({ url })
                                    setLoading(false)
                                    Message.success('success')
                                } catch (error) {}
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AList
