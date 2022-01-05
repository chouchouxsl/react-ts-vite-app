import react from '@vitejs/plugin-react'
import type { Plugin, PluginOption } from 'vite'
import createHtml from './html'
import createStyleImport from './styleImport'

export default function createVitePlugins(viteEnv: any, isBuild: boolean = false) {
    const vitePlugins: (Plugin | PluginOption[] | Plugin[])[] = [
        react(),
        createHtml(viteEnv, isBuild),
        createStyleImport()
    ]

    return vitePlugins
}
