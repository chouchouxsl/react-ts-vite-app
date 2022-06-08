import React from 'react'
import { useSelector } from 'react-redux'
import { ReducerState } from '@/redux'
import { Roles } from '@/enums/globalEnums'

const AuthWarp: React.FC = props => {
    const role = useSelector((state: ReducerState) => state.userInfo.userInfo.role)

    const { children } = props

    return role === Roles.ADMIN ? <>{children}</> : null
}

export default AuthWarp
