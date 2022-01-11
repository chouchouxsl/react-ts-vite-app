declare module '@/settings.json' {
    export interface ISettings {
        isSystemTheme: boolean
        navbar: boolean
        menu: boolean
        footer: boolean
        themeColor: string
        menuWidth: number
        title: string
        isShowNprogress: boolean
    }

    const settings: ISettings

    export default settings
}
