import htmlPlugin from 'vite-plugin-html'
import { title } from '../../src/settings.json'

export default function createHtml(env: any, isBuild: boolean) {
    const html = htmlPlugin({
        inject: {
            data: {
                title
            }
        },
        minify: isBuild
    })
    return html
}
