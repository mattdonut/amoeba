import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './index.css';
import App from './App';
import RoutedEvo from './components/routedEvo'
import { list } from './store/api'
import { EvoStore, setStoreAction } from './store/evo'

// Reducer
import reducer from './reducers/appReducer'

// HARDCODED INITIAL STATE!!
import initState from './store/sampleStore'

// create a store that has redux-thunk middleware enabled
const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);
  
// Make the local app state
const store = createStoreWithMiddleware(reducer, initState);

list().then((evos) => {
    const allKeys = evos.map((evo) => evo.id)
    const newStore: EvoStore = {allKeys}
    for (let evo of evos) {
        newStore[evo.id] = evo
    }
    store.dispatch(setStoreAction(newStore))
})

ReactDOM.render(
    <Provider store={store}>
    <Router>
        <div className="page">
        <header>
            <Link to={'/evo/0'}>Evolver</Link>
        </header>
            <main>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/evo/:id" component={RoutedEvo} />
                    <Redirect to='/evo/0'></Redirect>
                </Switch>
            </main>
        </div>
    </Router>
    </Provider>,
    document.getElementById('root')
);
