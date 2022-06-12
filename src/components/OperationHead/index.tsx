import { ReactNode } from 'react'

interface OhPorp {
    width?: number | string
    height?: number | string
    marginBottom?: number | string
    borderRadius?: number | string
    leftDOM?: ReactNode | null
    rightDOM?: ReactNode | null
}

export default ({ rightDOM, leftDOM, marginBottom = 20, borderRadius = 4, ...porp }: OhPorp) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid var(--color-neutral-3)',
                padding: 20,
                width: '100%',
                background: 'var(--color-bg-2)',
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
