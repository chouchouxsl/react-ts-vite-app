import { useContext } from 'react'
import { GlobalContext } from '@/context/globalContext'
import defaultLocale from '../locale'
import type { IGlobalContent } from '@/context/globalContext'

function useLocale(locale = null) {
    const { lang } = useContext(GlobalContext) as Required<IGlobalContent>

    return (locale || defaultLocale)[lang] || {}
}

export default useLocale
