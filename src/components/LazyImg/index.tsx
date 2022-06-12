import { Image, ImageProps } from '@arco-design/web-react'
import LazyLoad from 'react-lazyload'
import loadingImg from '@/assets/imgs/img-loading.gif'

type LazyImgProps = {
    src: string
} & ImageProps

export default ({ height = 400, ...props }: LazyImgProps) => {
    const holderImg = <img style={{ width: '100%', height: `${height}px`, objectFit: 'cover' }} src={loadingImg} />

    return (
        <LazyLoad height={height} placeholder={holderImg}>
            <Image {...props} loader={holderImg} />
        </LazyLoad>
    )
}
