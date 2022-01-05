import eslintPlugin from 'vite-plugin-eslint'

export default function createEslintPlugin() {
    return eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
        fix: true,
        cache: false,
        exclude: ['node_modules', 'dist']
    })
}
