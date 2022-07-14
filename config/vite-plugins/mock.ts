import { viteMockServe } from 'vite-plugin-mock'
import type { ViteEnv } from '../../src/typings/config'

export default function createMockServe(viteEnv: ViteEnv, isBuild: boolean) {
    return viteMockServe({
        mockPath: './src/mock',
        localEnabled: !isBuild && viteEnv.VITE_OPEN_MOCK,
        prodEnabled: isBuild && viteEnv.VITE_OPEN_MOCK,
        watchFiles: true,
        /* 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。 */
        supportTs: true
    })
}
