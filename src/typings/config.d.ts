export interface ViteEnv {
    VITE_APP_TITLE?: string
    VITE_OPEN_PROXY?: boolean
    NODE_ENV?: string
    VITE_BUILD_SOURCEMAP?: boolean
    VITE_BUILD_DROP_CONSOLE?: boolean
    VITE_BUILD_COMPRESS?: 'gzip' | 'brotli'
}
