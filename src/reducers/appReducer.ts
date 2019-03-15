// Allowed State
import { combineReducers } from 'redux'
import {EvoStoreReducer} from './evo'

// The root reducer combines reducers from each data domain
const rootReducer = combineReducers({
    evoStore: EvoStoreReducer
})

export default rootReducer