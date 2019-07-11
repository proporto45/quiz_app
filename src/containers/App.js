import React, {Component} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import {hot} from 'react-hot-loader';
import QuizApp from './QuizApp';
import * as reducers from '../reducers';

function configuringStore() {

    const reducer = combineReducers(reducers);
    const store = createStore(reducer, applyMiddleware(thunk));
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

const App = () => <div>
    <Provider store={configuringStore()}>
        <QuizApp/>
    </Provider>
</div>;

export default hot(module)(App)
