import React, { type ReactNode } from 'react'

interface OhPorp {
    width?: number | string
    height?: number | string
    marginBottom?: number | string
    borderRadius?: number | string
    leftDOM?: ReactNode | null
    rightDOM?: ReactNode | null
}

const OperationHead = ({ rightDOM, leftDOM, marginBottom = 20, borderRadius = 4, ...porp }: OhPorp) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 20,
                width: '100%',
                background: 'var(--op-color)',
                backdropFilter: 'var(--bg-filter)',
                borderRadius,
                marginBottom,
                ...porp
            }}
        >
            <div>{leftDOM}</div>
            <div>{rightDOM}</div>
        </div>
    )
}

export default OperationHead
