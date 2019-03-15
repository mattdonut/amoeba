import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import RoutedEvo from './components/routedEvo'

// Reducer
import reducer from './reducers/appReducer'

// HARDCODED INITIAL STATE!!
import initState from './store/sampleStore'

// Make the local app state
const store = createStore(reducer, initState)


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
                </Switch>
            </main>
        </div>
    </Router>
    </Provider>,
    document.getElementById('root')
);
