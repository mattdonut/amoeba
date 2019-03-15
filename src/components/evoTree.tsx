import React, { StatelessComponent, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Evo } from '../store/evo'
import { EvoTree } from '../store/evoTree'

interface EvoTreeComponentProps {
    evoTree: EvoTree
    updater: (evo: Evo) => void
    addChild: (id: number, name: string) => void
}

const layoutStyles = {
    display: 'flex'
}

const spacerStyle = {
    flex: '1 1 auto',
    "border-right": 'solid black 1px'
}

const childStyle = {
    flex: '10 1 auto'
}

function addChildWithName(id: number, adder: (id: number, name: string) => void) {
    const name = prompt('Name your evolution!')
    if (name) {
        adder(id, name)
    }
}

function enterEditMode(name: string, 
        setEdit: (state: boolean) => void, setLocal: (name: string) => void) {
    setLocal(name)
    setEdit(true)
}

const EvoTreeComponent: StatelessComponent<EvoTreeComponentProps> = ({ evoTree, updater, addChild }) => {
    const evo = evoTree.evo
    const [editing, setEdit] = useState(false)
    const [localName, updateLocal] = useState(evo.name)

    let childrenFragment = <></>
    if (evoTree.children && evoTree.children.length > 0) {
        childrenFragment = (
            <div style={layoutStyles}>
                <span style={spacerStyle}>
                    &nbsp;
                </span>
                <span style={childStyle}>
                    {evoTree.children.map((child) => {
                        return (<EvoTreeComponent key={child.evo.id} evoTree={child} updater={updater} addChild={addChild}></EvoTreeComponent>)
                    })}

                </span>
            </div>
       )
    }

    const saveLocal = () => {
        console.log('Using updater!', evo, localName);
        
        updater(Object.assign({}, evo, {name: localName}))
    }

    let nameFragment = 
        <>
            &nbsp;<Link to={'/evo/' + evo.id}>{evo.name}</Link>&nbsp;
            <button onClick={(e) => enterEditMode(evo.name, setEdit, updateLocal)}>Edit</button>
        </>
    if (editing) {
        nameFragment = (
            <>
                <input value={localName} onChange={(e) => updateLocal(e.target.value)}></input>
                <button onClick={(e) => {saveLocal(); setEdit(false)}}>Save</button>
                <button onClick={(e) => setEdit(false)}>Cancel</button>
            </>
        )
    }
    return (
        <div>
            <h3>
                {nameFragment}
                <button onClick={(e) => addChildWithName(evo.id, addChild)}>Evolve</button>
            </h3>
            
            {childrenFragment}
        </div>
    )
}

export default EvoTreeComponent