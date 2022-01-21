import defaultSettings, { ISettings } from '@/settings.json'
import { IAcition } from '@/redux'
import darkTheme from '@/utils/systemTheme'
import { ThemeEnum } from '@/enums/globalEnums'

export interface GlobalState {
    theme?: string
    settings?: ISettings
}

// 自动设置监听系统主题变化
if (defaultSettings.isSystemTheme) {
    localStorage.setItem('theme', darkTheme.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT)
}

const defaultTheme: GlobalState['theme'] = localStorage.getItem('theme') || ThemeEnum.LIGHT

function changeTheme(newTheme?: string) {
    if ((newTheme || defaultTheme) === ThemeEnum.DARK) {
        document.body.setAttribute('arco-theme', ThemeEnum.DARK)
    } else {
        document.body.removeAttribute('arco-theme')
    }
}

// init page theme
changeTheme()

const initialState: GlobalState = {
    theme: defaultTheme,
    settings: defaultSettings
}

export default function (state: GlobalState = initialState, action: IAcition) {
    switch (action.type) {
        case 'toggle-theme': {
            const { theme } = action.payload
            if (theme === ThemeEnum.LIGHT || theme === ThemeEnum.DARK) {
                localStorage.setItem('theme', theme)
                changeTheme(theme)
            }

            return {
                ...state,
                theme
            }
        }
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
