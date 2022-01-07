import { combineReducers, createStore, Action } from 'redux'
import global, { GlobalState } from './reducers/global'

export interface IAcition extends Action<string> {
    type: string
    payload?: any
}

export interface ReducerState {
    global: GlobalState
}

const reducers = combineReducers({
    global
})

const store = createStore(reducers)

export default store
