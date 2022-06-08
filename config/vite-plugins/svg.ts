import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default function createSvgIcons() {
    return createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]'
    })
}
