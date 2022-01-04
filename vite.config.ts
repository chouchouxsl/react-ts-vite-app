import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            less: {
                // 支持内联js
                javascriptEnabled: true
                // 重写less变量，定制样式
                // modifyVars:variablesConfig
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve('src'),
            '@assets': path.resolve('src/assets'),
            '@components': path.resolve('src/components')
        }
    }
})
