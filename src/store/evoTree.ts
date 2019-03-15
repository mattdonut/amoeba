import { Evo, EvoStore } from './evo'

export interface EvoTree {
    evo: Evo
    children: EvoTree[]
}

function getChildren(evo: Evo, store: EvoStore): Evo[] {
    return store.allKeys.map((id) => store[id])
            .filter((child) => child.parentId == evo.id)
}

export function getEvoTree(evo: Evo, store: EvoStore): EvoTree {
    const children = getChildren(evo, store)
    const childTrees = children.map((child) => getEvoTree(child, store))
    return {
        evo: evo,
        children: childTrees
    }
}