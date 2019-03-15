import { EvoStore, EvoStoreAction } from './evo'

// The union of all actions possible in our data store
export type AppAction = EvoStoreAction

// The combined description of our app's data store
export interface AppState {
    evoStore: EvoStore
}

// The type signature of our redux store dispatch method 
export type AppDispatch = (action: AppAction) => void