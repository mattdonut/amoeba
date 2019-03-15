// evo.ts defines the Evo entity type and associated store

// It also defines actions to be used to drive CRUD in a redux
// style store.

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

// Note that a Read operation does not need an action as it
// is nilpotent

export type EvoStoreAction = CreateEvoAction | DeleteEvoAction | UpdateEvoAction

// Overly simple function to get the next id to assign
// This will eventually need to be a remote call to the database
export function generateNextEvoId(store: EvoStore): number {
    return store.allKeys[store.allKeys.length - 1] + 1
}

