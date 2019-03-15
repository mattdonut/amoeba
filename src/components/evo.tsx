import React, { StatelessComponent } from 'react'
import { AppState, AppAction, AppDispatchable } from '../store/app'
import { connect } from 'react-redux'
import { EvoTree, getEvoTree } from '../store/evoTree'
import EvoTreeComponent from './evoTree'
import { Evo, evolveAction, updateEvoAction, updateEvoThunk, deleteEvoAction, evolveEvoThunk } from '../store/evo'
import { Redirect } from 'react-router-dom';

interface EvoComponentProps {
    evoTree: EvoTree | null
    updater: (evo: Evo) => void
    addChild: (id: number, name: string) => void
    deleter: (evo: Evo) => void
}

interface EvoContainerProps {
    evoId: number
}

const EvoComponent: StatelessComponent<EvoComponentProps> = ({evoTree, updater, addChild, deleter}) => {
    if (evoTree != null) {
        console.log(evoTree.evo)
        const evo = evoTree.evo
        if (evo.parentId != null) {
            return (
                <>
                    <button onClick={(e) => deleter(evo)}>Delete</button>
                    <EvoTreeComponent 
                        evoTree={evoTree}
                        updater={updater}
                        addChild={addChild}>
                    </EvoTreeComponent>
                </>
            )
        }
        return (
            <EvoTreeComponent 
                        evoTree={evoTree}
                        updater={updater}
                        addChild={addChild}>
                    </EvoTreeComponent>
        )
    }
    // If there is no tree for this id, redirect to the root
    return <Redirect to='/evo/0'></Redirect>
}


const mapStateToProps = (state: AppState, props: EvoContainerProps) => {
    const evo = state.evoStore[props.evoId]
    if (evo) {
        const tree = getEvoTree(state.evoStore[props.evoId], state.evoStore)
        return {
            evoTree: tree
        }
    }
    return {
        evoTree: null
    }
}

const mapDispatchToProps = (dispatch: (action: AppDispatchable) => void, props: EvoContainerProps) => {
    return {
        addChild: (id: number, name: string) => {
            dispatch(evolveEvoThunk(id, name))
        },
        updater: (evo: Evo) => {
            dispatch(updateEvoThunk(evo))
        },
        deleter: (evo: Evo) => {
            dispatch(deleteEvoAction(evo))
        }
    }
}

const EvoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EvoComponent)

export default EvoContainer