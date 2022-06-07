import React from 'react'
import { Breadcrumb as Bread } from '@arco-design/web-react'
import { IconRight } from '@arco-design/web-react/icon'
import { useHistory } from 'react-router-dom'
import useLocale from '@/hooks/useLocale'

const BreadItem = Bread.Item

const Breadcrumb = ({ breadcrumb }: { breadcrumb: any[] }) => {
    const t = useLocale()
    const history = useHistory()
    return (
        <Bread separator={<IconRight />}>
            {breadcrumb.map(route => (
                <BreadItem key={route.key}>
                    {route.redirect ? (
                        <a onClick={() => history.replace(route.redirect)}>{t[route.name]}</a>
                    ) : (
                        <span>{t[route.name]}</span>
                    )}
                </BreadItem>
            ))}
        </Bread>
    )
}

export default Breadcrumb
