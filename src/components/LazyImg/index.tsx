import React from 'react'
import { Image } from '@arco-design/web-react'
import LazyLoad from 'react-lazyload'
import loadingImg from '@/assets/imgs/img-loading.gif'
import type { ImageProps } from '@arco-design/web-react'

type LazyImgProps = {
    src: string
    borderRadius?: number | string
    overflow?: boolean
} & ImageProps

const LazyImg = ({
    height = '100%',
    width = '100%',
    borderRadius = 0,
    preview = false,
    overflow = false,
    ...props
}: LazyImgProps) => {
    const holderImg = (
        <img
            style={{
                // width: `${width}`,
                // height: `${height}`,
                // borderRadius: `${borderRadius}`,
                objectFit: 'cover'
            }}
            src={loadingImg}
        />
    )

    return (
        <LazyLoad
            style={{
                width: `${width}`,
                height: `${height}`,
                borderRadius: `${borderRadius}`,
                overflow: 'hidden'
            }}
            overflow={overflow}
        >
            <Image
                {...props}
                height={height}
                width={width}
                loader={holderImg}
                preview={preview}
                style={{ borderRadius, overflow: 'hidden' }}
            />
        </LazyLoad>
    )
}

export default LazyImg
