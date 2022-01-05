import react from '@vitejs/plugin-react'
import type { Plugin, PluginOption } from 'vite'
import createHtml from './html'
import createStyleImport from './styleImport'
import createEslintPlugin from './eslint'

export default function createVitePlugins(viteEnv: any, isBuild: boolean) {
    const vitePlugins: (Plugin | PluginOption[] | Plugin[])[] = [
        react(),
        createHtml(viteEnv, isBuild),
        createStyleImport(),
        createEslintPlugin()
    ]

    return vitePlugins
}
