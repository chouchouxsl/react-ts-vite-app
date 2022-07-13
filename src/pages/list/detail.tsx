import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    Button,
    Card,
    Descriptions,
    Image,
    Input,
    Link,
    List,
    Message,
    Modal,
    Pagination
} from '@arco-design/web-react'
import { IconCopy, IconFindReplace } from '@arco-design/web-react/icon'
import { crawlingWorksAllApi, crawlingWorksListApi, getWorksByIdApi, getWorksInfoApi } from '@/api'
import useLocale from '@/hooks/useLocale'
import SvgIcon from '@/components/SvgIcon'
import useUpdate from '@/hooks/useUpdate'
import LazyImg from '@/components/LazyImg'
import OperationHead from '@/components/OperationHead'
import clipboard from '@/utils/clipboard'
import style from './style/detail.module.less'

const Meta = Card.Meta
const InputSearch = Input.Search

interface RequestParams {
    id: string
}

interface FindWorks {
    readonly id: string
    readonly title?: string
    readonly pageNum?: number
    readonly pageSize?: number
}

const AListDetail: React.FC = () => {
    const params = useParams<RequestParams>()

    const t = useLocale()

    const [page, setPage] = useState<IPageInfo>({
        pageNum: 1,
        pageSize: 8,
        total: 0
    })

    const [effect, triggerUpdate] = useUpdate()

    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [info, setInfo] = useState<any>(null)
    const [actor, setActor] = useState<any>(null)
    const [list, setList] = useState<any[]>([])
    const [isShowDialog, setShowDialog] = useState(false)

    const onSearch = (num = 1) => {
        setPage(v => ({ ...v, pageNum: num }))
        setList([])
        window.scroll(0, 0)
        triggerUpdate()
    }

    useEffect(() => {
        // getList()
    }, [effect])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function getList() {
        setLoading(true)
        try {
            const { actor, list, total } = await getWorksByIdApi<FindWorks>({
                id: params?.id,
                pageNum: page.pageNum,
                pageSize: page.pageSize,
                title
            })
            setActor(actor)
            setPage(v => ({ ...v, total }))
            setList(list)
        } catch {
        } finally {
            setLoading(false)
        }
    }

    async function openWorksInfo(id: number) {
        const res = await getWorksInfoApi({ id })
        console.log('🤪 res >>:', res)
        if (!res) {
            Modal.confirm({
                title: '温馨提示',
                content: '还没有数据, 是否爬取?',
                focusLock: false,
                onOk: () => {
                    return new Promise((resolve, reject) => {
                        crawlingWorksListApi({ id })
                            .then(res => {
                                resolve(res)
                                Message.success('爬取成功')
                                openWorksInfo(id)
                            })
                            .catch(err => reject(err))
                    }).catch(e => {
                        Message.error({ content: e })
                        throw e
                    })
                }
            })
            return
        }
        setInfo(res)
        setShowDialog(true)
    }

    async function crawlingWorksAll() {
        await crawlingWorksAllApi({ id: actor.id })
    }

    function formatMagnetLinks(magnetLinks: any[]) {
        return magnetLinks.map((mk: any) => mk.magnetLink).join('\n')
    }

    return (
        actor && (
            <div className="app-warp">
                <OperationHead
                    leftDOM={
                        <div className={style['title-warp']}>
                            <LazyImg width={100} height={100} borderRadius={100} src={actor.avatar} />
                            <div className={style.title}>{actor.name} </div>
                        </div>
                    }
                    rightDOM={
                        <>
                            <InputSearch
                                searchButton={<SvgIcon name="search" color="#fff" />}
                                loading={loading}
                                allowClear
                                placeholder={t['list.detail.search']}
                                style={{ width: 350, height: 40 }}
                                value={title}
                                onChange={val => setTitle(val)}
                                onClear={() => {
                                    setTitle('')
                                    onSearch()
                                }}
                                onSearch={() => onSearch()}
                                onPressEnter={e => {
                                    if (e.keyCode === 13) {
                                        onSearch()
                                    }
                                }}
                            />
                            <br />
                            <br />
                            <Button long size="large" type="primary" onClick={() => crawlingWorksAll()}>
                                获取演员的所有信息
                            </Button>
                        </>
                    }
                />
                <div className={style.content}>
                    {list.map((item, index) => (
                        <Card
                            hoverable
                            key={index}
                            cover={<LazyImg preview src={item.cover} />}
                            actions={[
                                <span key={index} className="icon-hover" onClick={() => openWorksInfo(item.id)}>
                                    <IconFindReplace />
                                </span>
                            ]}
                        >
                            <Meta title={item.title} />
                        </Card>
                    ))}
                </div>
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

                <Modal
                    title={<div style={{ textAlign: 'left' }}> 查看详情 </div>}
                    visible={isShowDialog}
                    unmountOnExit
                    hideCancel
                    onOk={() => {
                        setShowDialog(false)
                    }}
                    onCancel={() => {
                        setShowDialog(false)
                    }}
                    style={{ width: '70vw' }}
                >
                    {info && (
                        <div className={style['works-info']}>
                            <Card title="基本信息" bordered>
                                <div className={style.base}>
                                    <Descriptions
                                        colon=" :"
                                        border
                                        data={[
                                            {
                                                label: '编号',
                                                value: info.serialNumber
                                            },
                                            {
                                                label: '时长',
                                                value: info.duration
                                            },
                                            {
                                                label: '发布日期',
                                                value: info.releaseDate
                                            },
                                            {
                                                label: '厂商',
                                                value: info.maker
                                            }
                                        ]}
                                    />
                                </div>
                            </Card>

                            {info.previewVideo && info.previewVideo !== 'https:undefined' && (
                                <Card title="视频预览" bordered>
                                    <div className={style.videowarp}>
                                        <video
                                            id="preview-video"
                                            src={info?.previewVideo}
                                            controls
                                            muted
                                            preload="auto"
                                        />
                                    </div>
                                </Card>
                            )}

                            {info.previewImages.length > 0 && (
                                <Card title="图片预览" bordered>
                                    <div className={style.imgswarp}>
                                        <Image.PreviewGroup infinite>
                                            {info.previewImages.map((src: any) => (
                                                <Image src={src.imageLink} key={src.id} />
                                            ))}
                                        </Image.PreviewGroup>
                                    </div>
                                </Card>
                            )}

                            {info.magnetLinks.length > 0 && (
                                <Card
                                    title="磁力链接"
                                    bordered
                                    extra={
                                        <Link
                                            onClick={async () => {
                                                await clipboard(formatMagnetLinks(info.magnetLinks))
                                                Message.success('复制成功')
                                            }}
                                        >
                                            <IconCopy />
                                            &nbsp;全部复制
                                        </Link>
                                    }
                                >
                                    <List
                                        dataSource={info.magnetLinks}
                                        render={(item, index) => (
                                            <List.Item
                                                key={index}
                                                actions={[
                                                    <Link
                                                        key={index}
                                                        onClick={async () => {
                                                            await clipboard(item.magnetLink)
                                                            Message.success('复制成功')
                                                        }}
                                                    >
                                                        <IconCopy />
                                                    </Link>
                                                ]}
                                            >
                                                {item.magnetLink}
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            )}
                        </div>
                    )}
                </Modal>
            </div>
        )
    )
}

export default AListDetail
