import defaultSettings, { ISettings } from '@/settings.json'
import { IAcition } from '@/redux'
import darkTheme from '@/utils/systemTheme'

export interface GlobalState {
    theme?: string
    settings?: ISettings
    userInfo?: {
        name?: string
        avatar?: string
        job?: string
        organization?: string
        location?: string
        email?: string
    }
}

if (defaultSettings.isSystemTheme) {
    localStorage.setItem('theme', darkTheme.matches ? 'dark' : 'light')
}

const defaultTheme: GlobalState['theme'] = localStorage.getItem('theme') || 'light'

const defaultUserInfo: GlobalState['userInfo'] = {
    name: 'rhz',
    avatar: 'https://himg.bdimg.com/sys/portraitn/item/public.1.50a4952.juf-AazrjHW-E-kqX1k0-Q'
}

function changeTheme(newTheme?: string) {
    if ((newTheme || defaultTheme) === 'dark') {
        document.body.setAttribute('arco-theme', 'dark')
    } else {
        document.body.removeAttribute('arco-theme')
    }
}

// init page theme
changeTheme()

const initialState: GlobalState = {
    theme: defaultTheme,
    settings: defaultSettings,
    userInfo: defaultUserInfo
}

export default function (state: GlobalState = initialState, action: IAcition) {
    switch (action.type) {
        case 'toggle-theme': {
            const { theme } = action.payload
            if (theme === 'light' || theme === 'dark') {
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
        case 'update-userInfo': {
            const { userInfo } = action.payload
            return {
                ...state,
                userInfo
            }
        }
        default:
            return state
    }
}
