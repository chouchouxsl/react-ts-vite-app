import React from 'react'
import style from './style/index.module.less'

interface SvgIconProps {
    name: string
    prefix?: string
    color?: string
    width?: string
    height?: string
    size?: string
    [K: string]: any
}

const SvgIcon: React.FC<SvgIconProps> = ({
    name,
    prefix = 'icon',
    color = 'var(--color-text-1)',
    width = '14px',
    height = '14px',
    size = '14px',
    ...props
}) => {
    const symbolId = `#${prefix}-${name}`

    return (
        <svg {...props} width={size} height={size} aria-hidden="true" className={style['svg-icon']}>
            <use href={symbolId} fill={color} />
        </svg>
    )
}

export default SvgIcon
