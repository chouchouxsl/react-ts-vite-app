import React from 'react'

interface SvgIconProps {
    name: string
    prefix?: string
    color?: string
    [K: string]: any
}

const SvgIcon: React.FC<SvgIconProps> = ({ name, prefix = 'icon', color = '#333', ...props }) => {
    const symbolId = `#${prefix}-${name}`

    return (
        <svg {...props} aria-hidden="true">
            <use href={symbolId} fill={color} />
        </svg>
    )
}

export default SvgIcon
