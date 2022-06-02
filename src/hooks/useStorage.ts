import { useEffect, useState } from 'react'

const getDefaultStorage = (key: string) => {
    return localStorage.getItem(key)
}

function useStorage(key: string, defaultValue?: string): [string, (val: string) => void, () => void] {
    const [storedValue, setStoredValue] = useState(getDefaultStorage(key) || defaultValue)

    const setStorageValue = (value: string) => {
        localStorage.setItem(key, value)
        value !== storedValue && setStoredValue(value)
    }

    const removeStorage = () => {
        localStorage.removeItem('key')
    }

    useEffect(() => {
        const storageValue = localStorage.getItem(key)
        if (storageValue) {
            setStoredValue(storageValue)
        }
    }, [])

    return [storedValue as string, setStorageValue, removeStorage]
}

export default useStorage
