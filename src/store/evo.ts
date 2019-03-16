// evo.ts defines the Evo entity type and associated store

// It also defines actions to be used to drive CRUD in a redux
// style store.
import { create, put } from './api'
import { AppState } from './app'
import { ThunkAction } from 'redux-thunk'
import { Dispatch, Action } from 'redux'

export interface Evo {
    id: number
    name: string
    parentId?: number
}

export interface EvoStore {
    [key: number]: Evo
    allKeys: number[]
}

export interface CreateEvoAction {
    type: 'CREATE_EVO'
    evo: Evo
}

export interface DeleteEvoAction {
    type: 'DELETE_EVO'
    id: number
}

export interface EvolveAction {
    type: 'EVOLVE'
    parentId: number
    name: string
}

export interface SetStoreAction {
    type: 'SET_STORE'
    store: EvoStore
}

// We might be able to relax the payload type to just
// a partial of the Evo that includes the id
export interface UpdateEvoAction {
    type: 'UPDATE_EVO'
    evo: Evo
}

// Action factories
export function deleteEvoAction(evo: Evo): DeleteEvoAction {
    return {
        type: 'DELETE_EVO',
        id: evo.id
    }
}

export function createEvoAction(evo: Evo): CreateEvoAction {
    return {
        type: 'CREATE_EVO',
        evo: evo
    }
}

export function updateEvoAction(evo: Evo): UpdateEvoAction {
    return {
        type: 'UPDATE_EVO',
        evo
    }
}

export function evolveAction(parentId: number, name: string): EvolveAction {
    return {
        type: 'EVOLVE',
        parentId,
        name
    }
}

export function setStoreAction(store: EvoStore): SetStoreAction {
    return {
        type: 'SET_STORE',
        store
    }
}

export function createEvo(evo: Evo, store: EvoStore): EvoStore {
    const newStore = Object.assign({}, store, {[evo.id]: evo})
    newStore.allKeys.push(evo.id)
    return newStore
}

export function deleteEvo(evoId: number, store: EvoStore): EvoStore {
    const newStore = Object.assign({}, store)
    delete newStore[evoId]
    newStore.allKeys.splice(newStore.allKeys.indexOf(evoId), 1)
    return newStore
}

export function updateEvo(evo: Evo, store: EvoStore): EvoStore {
    const newStore = Object.assign({}, store, {[evo.id]: evo})
    if (newStore.allKeys.indexOf(evo.id) < 0) {
        newStore.allKeys.push(evo.id)
    }
    return newStore
}

export function evolve(parentId: number, name: string, store: EvoStore): EvoStore {
    const newEvo = {
        id: generateNextEvoId(store),
        name,
        parentId
    }
    return createEvo(newEvo, store)
}

export function setStore(newStore: EvoStore): EvoStore {
    return Object.assign({}, newStore)
}

// Note that a Read operation does not need an action as it
// is nilpotent


export type EvoStoreActionBase = CreateEvoAction | DeleteEvoAction | UpdateEvoAction | EvolveAction | SetStoreAction
type EvoThunkAction = ThunkAction<Promise<EvoStoreActionBase>, AppState, void, Action<EvoStoreActionBase>>

// We export two action super types, one for the reducers, and one for the
// dispatch method. This is to address the issue of the Thunk dispatcher
// accepting a broader set of actions than the reducers.
export type EvoStoreAction = EvoStoreActionBase
export type EvoDispatchable = EvoStoreActionBase | EvoThunkAction

// Overly simple function to get the next id to assign
// This will eventually need to be a remote call to the database
export function generateNextEvoId(store: EvoStore): number {
    return store.allKeys[store.allKeys.length - 1] + 1
}

// Thunks for working with networking
export function evolveEvoThunk(parentId: number, name: string): EvoThunkAction {
    return async function (dispatch: Dispatch) {
        try {
            // Creation is not currently optimistic
            const newEvo = await create(parentId, name)
            return dispatch(createEvoAction(newEvo))
        }
        catch (e) {
            // Nothing yet, should set messaging
            return createEvoAction({id: -1, name: 'Error'})
        }
    }
}


export function updateEvoThunk(evo: Evo): EvoThunkAction {
    return async function (dispatch: Dispatch, getState: () => any) {
        const prevEvo = getState().evoStore[evo.id]
        // optimistic update
        let act = dispatch(updateEvoAction(evo))
        try {
            // persist
            await put(evo)
        }
        catch (e) {
            // rollback
            console.warn('Update failed!', e)
            act = dispatch(updateEvoAction(prevEvo))
        }
        return act
    }
}