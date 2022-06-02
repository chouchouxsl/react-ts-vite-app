import { createContext } from 'react'

export interface IGlobalContent {
    lang?: string
    setLang?: (value: string) => void
    theme?: string
    setTheme?: (value: string) => void
}

export const GlobalContext = createContext<IGlobalContent>({})
