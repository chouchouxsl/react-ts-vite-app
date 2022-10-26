import React from 'react'
import style from './style/index.module.less'
interface IGroundGlassbg {
    height: string
    saturate: string
    url: string
    defaultBgColor: string
    blur: string
    radius: string
    children: any
}

const GroundGlassbg: React.FC<any> = (props: IGroundGlassbg) => {
    const {
        height = '300px',
        saturate = '50%',
        url = '',
        defaultBgColor = 'rgba(0,0,0,0)',
        blur = '20px',
        children,
        radius = '0px'
    } = props

    return (
        <div
            className={style['ground-glassbg']}
            style={{
                height,
                borderRadius: radius,
                backgroundColor: defaultBgColor,
                backgroundImage: `url(${url})`
            }}
        >
            <div
                className={style['warp']}
                style={{
                    backdropFilter: `blur(${blur}) saturate(${saturate})`
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default GroundGlassbg
