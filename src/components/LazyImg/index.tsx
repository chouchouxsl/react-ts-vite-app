import { Image, ImageProps } from '@arco-design/web-react'
import LazyLoad from 'react-lazyload'
import loadingImg from '@/assets/imgs/img-loading.gif'

type LazyImgProps = {
    src: string
    borderRadius?: number | string
} & ImageProps

export default ({ height = '100%', width = '100%', borderRadius = 0, preview = false, ...props }: LazyImgProps) => {
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
            placeholder={holderImg}
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
