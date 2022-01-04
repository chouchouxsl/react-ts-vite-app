import { useContext, createContext } from 'react'

export interface ILocaleContent {
    locale?: Record<string, string>
}

export const GlobalContext = createContext<ILocaleContent>({})

function useLocale() {
    const { locale } = useContext(GlobalContext)

    return locale
}

export default useLocale
