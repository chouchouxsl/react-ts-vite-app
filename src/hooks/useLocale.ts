import { useContext, createContext } from 'react'

export const GlobalContext = createContext<{ locale?: Record<string, string> }>({})

function useLocale() {
    const { locale } = useContext(GlobalContext)

    return locale
}

export default useLocale
