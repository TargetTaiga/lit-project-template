import { combineReducers, createStore } from 'redux';

function appReducer(state = {}) {
    return state;
}

const reducers = {
    app: appReducer
};

export const store = createStore(combineReducers(reducers));

export function defineReducer(name, reducer) {
    reducers[name] = reducer;
    store.replaceReducer(combineReducers(reducers));
}