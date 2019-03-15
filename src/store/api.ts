// This is a stub api

import { Evo, EvoStore, generateNextEvoId } from './evo'


const localString = localStorage.getItem('evoStore')
let local: EvoStore = {allKeys: [0], 0: {id: 0, name: 'Amoeba'}}
if (localString) {
    local = JSON.parse(localString)
}

function store(obj: EvoStore) {
    localStorage.setItem('evoStore', JSON.stringify(obj))
}

export function list(): Promise<Evo[]> {
    return Promise.resolve(local.allKeys.map((id) => local[id]))
}

export function get(id: number): Promise<Evo> {
    return Promise.resolve(local[id])
}

export function put(evo: Evo): Promise<Evo> {
    local[evo.id] = evo
    if (local.allKeys.indexOf(evo.id) < 0) {
        local.allKeys.push(evo.id)
    }
    store(local)
    return Promise.resolve(evo)
}

export function create(parentId: number, name: string): Promise<Evo> {
    const newEvo = {
        id: generateNextEvoId(local),
        name,
        parentId
    }
    console.log('Creating new Evo: ', newEvo)
    return put(newEvo)
}

export function del(id: number): Promise<boolean> {
    delete local[id]
    store(local)
    return Promise.resolve(true)
}

export function clear() {
    local = {allKeys: []}
    store(local)
}
