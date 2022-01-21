import { IAcition } from '../index'

export interface IUser {
    name?: string
    avatar?: string
    location?: string
}

export interface IUserInfo {
    userInfo: IUser
    token?: string
}

const defaultUserInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : {
          name: '',
          avatar: '',
          location: ''
      }

const initialState: IUserInfo = {
    userInfo: defaultUserInfo,
    token: localStorage.getItem('token') || ''
}

export default function (state: IUserInfo = initialState, action: IAcition) {
    switch (action.type) {
        case 'update-user':
            const { userInfo } = action.payload
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            return {
                ...state,
                userInfo
            }
        case 'add-token':
            const { token } = action.payload
            localStorage.setItem('token', token)
            return {
                ...state,
                token
            }
        case 'remove-token':
            localStorage.removeItem('token')
            return {
                ...state,
                token: ''
            }
        default:
            return state
    }
}
