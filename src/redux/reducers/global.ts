import defaultSettings from '@/settings.json'
import darkTheme from '@/utils/systemTheme'
import { ThemeEnum } from '@/enums/globalEnums'
import type { IAcition } from '@/redux'
import type { ISettings } from '@/settings.json'

export interface GlobalState {
    settings?: ISettings
}

// 自动设置监听系统主题变化
if (defaultSettings.isSystemTheme) {
    localStorage.setItem('theme', darkTheme.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT)
}

const initialState: GlobalState = {
    settings: defaultSettings
}

export default function (state: GlobalState = initialState, action: IAcition) {
    switch (action.type) {
        case 'update-settings': {
            const { settings } = action.payload
            return {
                ...state,
                settings
            }
        }
        default:
            return state
    }
}
