import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar, Card, Input, Pagination, Image } from '@arco-design/web-react'
import LazyLoad from 'react-lazyload'
import { IconFindReplace, IconLoading } from '@arco-design/web-react/icon'
import { getListByIdApi, getWorksByIdApi } from '@/api'
import style from './style/detail.module.less'
import useLocale from '@/hooks/useLocale'
import SvgIcon from '@/components/SvgIcon'
import useUpdate from '@/hooks/useUpdate'
import LazyImg from '@/components/LazyImg'

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

    const [page, setPage] = useState({
        pageNum: 1,
        pageSize: 8,
        total: 0
    })

    const [effect, triggerUpdate] = useUpdate()

    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [info, setInfo] = useState<any>({})
    const [list, setList] = useState<any[]>([])

    const onSearch = (num = 1) => {
        setPage(v => ({ ...v, pageNum: num }))
        setList([])
        window.scroll(0, 0)
        triggerUpdate()
    }

    useEffect(() => {
        getList()
    }, [effect])

    async function getList() {
        setLoading(true)
        try {
            const res = await getListByIdApi<RequestParams>({ id: params?.id })
            const { list, total } = await getWorksByIdApi<FindWorks>({
                id: params?.id,
                pageNum: page.pageNum,
                pageSize: page.pageSize,
                title
            })
            console.log('res :>> ', res, list)
            setInfo(res)
            setPage(v => ({ ...v, total }))
            setList(list)
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="app-warp">
            <div className={style.header}>
                <div className={style.left}>
                    <LazyImg width={100} height={100} borderRadius={100} src={info.avatar} />
                    <div className={style.title}>{info.name} </div>
                </div>

                <div className={style.right}>
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
                </div>
            </div>
            <div className={style.content}>
                {list.map((item, index) => (
                    <Card
                        hoverable
                        key={index}
                        cover={<LazyImg preview src={item.cover} />}
                        actions={[
                            <span
                                className="icon-hover"
                                onClick={() => window.open(`https://javdb39.com/${item.href}`)}
                            >
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
    )
}

export default AListDetail
