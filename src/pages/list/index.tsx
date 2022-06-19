import React, { useEffect, useState } from 'react'
import { IconDelete, IconEye } from '@arco-design/web-react/icon'
import { Button, Form, Input, List, Message, Modal, Pagination, Popconfirm, Spin } from '@arco-design/web-react'
import { getListAllApi, deleteActorItemApi, crawlingActorListApi } from '@/api'
import style from './style/index.module.less'
import { history } from '@/route'
import useLocale from '@/hooks/useLocale'
import LazyImg from '@/components/LazyImg'
import OperationHead from '@/components/OperationHead'
import SvgIcon from '@/components/SvgIcon'
import useUpdate from '@/hooks/useUpdate'
import AuthWarp from '@/components/AuthWarp'
import { Roles } from '@/enums/globalEnums'

const AList: React.FC = () => {
    const t = useLocale()
    const [form] = Form.useForm()
    const [list, setList] = useState<any[]>([])
    const [name, setName] = useState<string>('')
    const [effect, triggerUpdate] = useUpdate()
    const [isShowLoading, setLoading] = useState(false)
    const [isShowDialog, setShowDialog] = useState(false)
    const [page, setPage] = useState<IPageInfo>({
        pageNum: 1,
        pageSize: 8,
        total: 0
    })

    const onSearch = (num = 1) => {
        setPage(v => ({ ...v, pageNum: num }))
        setList([])
        window.scroll(0, 0)
        triggerUpdate()
    }

    useEffect(() => {
        getList()
        console.log('🤪 name >>:', name)
    }, [effect])

    async function getList() {
        const { list, total } = await getListAllApi({
            pageNum: page.pageNum,
            pageSize: page.pageSize,
            actor_name: name
        })
        setList(list)
        setPage(v => ({ ...v, total }))
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
                    leftDOM={
                        <Input.Search
                            searchButton={<SvgIcon name="search" color="#fff" />}
                            allowClear
                            placeholder={t['list.detail.search']}
                            style={{ width: 350, height: 40 }}
                            value={name}
                            onChange={val => setName(val)}
                            onClear={() => {
                                setName('')
                                onSearch()
                            }}
                            onSearch={() => onSearch()}
                            onPressEnter={e => {
                                if (e.keyCode === 13) {
                                    onSearch()
                                }
                            }}
                        />
                    }
                    rightDOM={
                        <AuthWarp roles={[Roles.ADMIN]}>
                            <Button type="primary" size="large" onClick={() => setShowDialog(true)}>
                                {t['list.add-data']}
                            </Button>
                        </AuthWarp>
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
                <div
                    className="pagination"
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBlock: '20px'
                    }}
                >
                    <Pagination
                        hideOnSinglePage
                        showTotal
                        total={page.total}
                        pageSize={page.pageSize}
                        current={page.pageNum}
                        showJumper
                        onChange={(pageNumber: number) => {
                            setPage(v => ({ ...v, pageNum: pageNumber }))
                            onSearch(pageNumber)
                        }}
                    />
                </div>
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
                            { required: true, message: t['list.dialog.input.placeholder'] },
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
                                    const res = await crawlingActorListApi({ url })
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
