import { combineReducers, createStore, Action } from 'redux'
import global, { GlobalState } from './reducers/global'
import userInfo, { IUserInfo } from './reducers/userInfo'

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
