import { combineReducers, createStore } from 'redux'
import global from './reducers/global'
import userInfo from './reducers/userInfo'
import type { Action } from 'redux'
import type { GlobalState } from './reducers/global'
import type { IUserInfo } from './reducers/userInfo'

export interface IAcition<T = any> extends Action<string> {
    type: string
    payload?: T
}

export interface ReducerState {
    global: GlobalState
    userInfo: IUserInfo
}

const reducers = combineReducers({
    global,
    userInfo
})

const store = createStore(reducers)

export default store
