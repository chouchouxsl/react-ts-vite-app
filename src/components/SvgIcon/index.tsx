import React from 'react'

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
    width = '12px',
    height = '12px',
    size = '12px',
    ...props
}) => {
    const symbolId = `#${prefix}-${name}`

    return (
        <svg {...props} width={size} height={size} aria-hidden="true">
            <use href={symbolId} fill={color} />
        </svg>
    )
}

export default SvgIcon
