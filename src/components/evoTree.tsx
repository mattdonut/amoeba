import React, { StatelessComponent } from 'react'

import { Evo } from '../store/evo'
import { EvoTree } from '../store/evoTree'

interface EvoTreeComponentProps {
    evoTree: EvoTree
    updater: (evo: Evo) => null
    addChild: (id: number) => null
}

const EvoTreeComponent: StatelessComponent<EvoTreeComponentProps> = ({ evoTree, updater, addChild }) => {
    const evo = evoTree.evo
    return (
        <div>
            <h3>{evo.name}</h3>
            <button onClick={(e) => addChild(evo.id)}>Add Descendent</button>
            <div>
                {evoTree.children.map((child) => {
                    return (<EvoTreeComponent key={child.evo.id} evoTree={child} updater={updater} addChild={addChild}></EvoTreeComponent>)
                })}
            </div>
        </div>
    )
}

export default EvoTreeComponent