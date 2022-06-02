import { useContext } from 'react'
import { GlobalContext } from '@/context/globalContext'
import defaultLocale from '../locale'

function useLocale(locale = null) {
    const { lang } = useContext(GlobalContext)

    if (lang) return (locale || defaultLocale)[lang] || {}
}

export default useLocale
