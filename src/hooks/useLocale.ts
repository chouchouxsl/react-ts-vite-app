import { useContext } from 'react'
import { GlobalContext } from '@/context/globalContext'

function useLocale() {
    const { locale } = useContext(GlobalContext)

    return locale
}

export default useLocale
