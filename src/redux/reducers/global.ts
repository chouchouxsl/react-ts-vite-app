import defaultSettings from '@/settings.json'

const defaultTheme = localStorage.getItem('theme') || 'light'

function changeTheme(newTheme?: 'string') {
    if ((newTheme || defaultTheme) === 'dark') {
        document.body.setAttribute('theme', 'dark')
    } else {
        document.body.removeAttribute('theme')
    }
}

// init page theme
changeTheme()

export interface GlobalState {
    theme?: string
    settings?: typeof defaultSettings
    userInfo?: {
        name?: string
        avatar?: string
        job?: string
        organization?: string
        location?: string
        email?: string
    }
}

const initialState: GlobalState = {
    theme: defaultTheme,
    settings: defaultSettings,
    userInfo: {}
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case 'toggle-theme': {
            const { theme } = action.payload
            if (theme === 'light' || theme === 'dark') {
                localStorage.setItem('arco-theme', theme)
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
