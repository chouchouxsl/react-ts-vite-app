import { combineReducers, createStore } from 'redux'
import global, { GlobalState } from './reducers/global'

export interface ReducerState {
    global: GlobalState
}

const reducers = combineReducers({
    global
})

const store = createStore(reducers)

export default store
