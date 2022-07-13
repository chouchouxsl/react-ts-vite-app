import React from 'react'
import { useSelector } from 'react-redux'
import { Roles } from '@/enums/globalEnums'
import type { ReducerState } from '@/redux'

// `${Roles}`
const AuthWarp: React.FC<{ roles?: Roles[] }> = props => {
    const role = useSelector((state: ReducerState) => state.userInfo.userInfo.role)

    const { children, roles = [Roles.ADMIN] } = props

    return roles.includes(role as Roles) ? <>{children}</> : null
}

export default AuthWarp
