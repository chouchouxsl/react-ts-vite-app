import { createContext } from 'react'

export interface ILocaleContent {
    locale?: Record<string, string>
}

export const GlobalContext = createContext<ILocaleContent>({})
