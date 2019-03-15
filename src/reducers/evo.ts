import { EvoStore, createEvo, deleteEvo, updateEvo } from '../store/evo'
import { AppAction } from '../store/app'

// Allowed State

export function EvoStoreReducer(store: EvoStore = blankEvoStore(), action: AppAction): EvoStore {
    switch (action.type) {
        case 'CREATE_EVO':
            return createEvo(action.evo, store)
        case 'DELETE_EVO':
            return deleteEvo(action.id, store)
        case 'UPDATE_EVO':
            return updateEvo(action.evo, store)
        default:
            return store
    }
}

export function blankEvoStore(): EvoStore {
    return {
        allKeys: []
    }
}