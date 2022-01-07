/* 
两种方式按需引入
*/
import styleImport from 'vite-plugin-style-import'

/**
 * @description: 中划线转驼峰
 * @param {string} s 接受的中划线字符串
 * @return {*}  驼峰命名字符串
 */
function lineToHump(s: string): string {
    const a = s.split('-')
    let result = a[0]
    for (let i = 1; i < a.length; i++) {
        result = result + a[i].slice(0, 1).toUpperCase() + a[i].slice(1)
    }
    return result
}

export default function createStyleImport() {
    return styleImport({
        libs: [
            {
                libraryName: '@arco-design/web-react',
                esModule: true,
                resolveStyle: name => {
                    // 转驼峰
                    const newName = lineToHump(name)
                    // css
                    // return `@arco-design/web-react/es/${newName}/style/css.js`
                    // less
                    return `@arco-design/web-react/es/${newName}/style/index.js`
                }
            }
        ]
    })
}
