import React, { StatelessComponent } from 'react'
import { AppState, AppAction } from '../store/app'
import { connect } from 'react-redux'
import { EvoTree, getEvoTree } from '../store/evoTree'
import EvoTreeComponent from './evoTree'
import { Evo } from '../store/evo'

interface EvoComponentProps {
    evoTree: EvoTree
    updater: (evo: Evo) => null
    addChild: (id: number) => null
}

interface EvoContainerProps {
    evoId: number
}

const EvoComponent: StatelessComponent<EvoComponentProps> = (props) => (
    <EvoTreeComponent {...props}></EvoTreeComponent>
)

const mapStateToProps = (state: AppState, props: EvoContainerProps) => {
    const tree = getEvoTree(state.evoStore[props.evoId], state.evoStore)
    console.log(tree)
    return {
        evoTree: tree
    }
}

const mapDispatchToProps = (dispatch: (action: AppAction) => void, props: EvoContainerProps) => {
    return {
        addChild: (id: number) => {
            return null
        },
        updater: (evo: Evo) => {
            return null
        }
    }
}

const EvoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EvoComponent)

export default EvoContainer