import { useState } from 'react'

export default () => {
    const [updete, setUpdate] = useState(false)

    const triggerUpdate = () => {
        setUpdate(!updete)
    }

    return [updete, triggerUpdate] as [boolean, () => void]
}
