import react from '@vitejs/plugin-react'
import type { Plugin, PluginOption } from 'vite'
import createHtml from './html'
import createStyleImport from './styleImport'
import createEslintPlugin from './eslint'
import createMockServe from './mock'
import { ViteEnv } from '../../src/typings/config'

export default function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
    const vitePlugins: (Plugin | PluginOption[] | Plugin[])[] = [
        react(),
        createHtml(viteEnv, isBuild),
        createMockServe(viteEnv, isBuild),
        createStyleImport(),
        createEslintPlugin()
    ]

    return vitePlugins
}
