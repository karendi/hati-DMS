import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const finalCreateStore = composeWithDevTools( applyMiddleware(thunk) )(createStore);

const Store = (initialState) => {
  return finalCreateStore(reducers, initialState);
}

export default Store;
