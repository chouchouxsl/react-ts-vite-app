export interface ViteEnv {
    VITE_APP_TITLE?: string
    VITE_OPEN_PROXY?: boolean
    VITE_BUILD_SOURCEMAP?: boolean
    VITE_BUILD_DROP_CONSOLE?: boolean
    VITE_BUILD_COMPRESS?: 'gzip' | 'brotli'
    VITE_OPEN_MOCK: boolean
}
