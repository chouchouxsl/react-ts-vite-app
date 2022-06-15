import React from 'react'
import { Breadcrumb as Bread } from '@arco-design/web-react'
import { IconRight } from '@arco-design/web-react/icon'
import { useHistory } from 'react-router-dom'
import useLocale from '@/hooks/useLocale'

const BreadItem = Bread.Item

const Breadcrumb = ({ breadcrumb }: { breadcrumb: any[] }) => {
    const t = useLocale()
    const history = useHistory()
    console.log('🤪 breadcrumb >>:', breadcrumb)
    return (
        <Bread separator={<IconRight />}>
            {breadcrumb.map((route, index) => (
                <BreadItem key={route.key}>
                    {index === breadcrumb.length - 1 || (index === 0 && !route.redirect) ? (
                        <span>
                            {route.icon && <span>{route.icon}&nbsp;&nbsp;</span>}
                            {t[route.name]}
                        </span>
                    ) : (
                        <a onClick={() => history.replace(`/${route.redirect ? route.redirect : route.key}`)}>
                            {route.icon && <span>{route.icon}&nbsp;&nbsp;</span>}
                            {t[route.name]}
                        </a>
                    )}
                </BreadItem>
            ))}
        </Bread>
    )
}

export default Breadcrumb
