import { useContext } from 'react'
import { GlobalContext, IGlobalContent } from '@/context/globalContext'
import defaultLocale from '../locale'

function useLocale(locale = null) {
    const { lang } = useContext(GlobalContext) as Required<IGlobalContent>

    return (locale || defaultLocale)[lang] || {}
}

export default useLocale
