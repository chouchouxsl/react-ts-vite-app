import path from 'path'
import { ConfigEnv, loadEnv, UserConfig } from 'vite'
import { ViteEnv } from './src/typings/config'
import createVitePlugins from './config/vite-plugins'
import { themeColor } from './src/settings.json'

const dirPath = (dir: string) => path.resolve(dir)

// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv): UserConfig => {
    const env: ViteEnv = loadEnv(mode, process.cwd())
    console.log('env command:>> ', env, command)
    const isBuild = command === 'build'

    return {
        base: isBuild ? '/dist/' : '/',
        plugins: createVitePlugins(env, isBuild),
        css: {
            preprocessorOptions: {
                less: {
                    // 支持内联js
                    javascriptEnabled: true,
                    // 重写less变量，定制样式
                    modifyVars: {
                        'arcoblue-6': themeColor
                    },
                    additionalData: `@import "${dirPath('src/style/var.less')}";`
                }
            }
        },
        resolve: {
            alias: {
                '@': dirPath('src'),
                '#': dirPath('src/typings'),
                assets: dirPath('src/assets'),
                components: dirPath('src/components')
            }
        },
        server: {
            port: 9999,
            open: false
        },
        build: {
            sourcemap: !isBuild,
            terserOptions: {
                compress: {
                    drop_console: isBuild
                }
            }
        }
    }
}
