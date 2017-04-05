import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';

// const configureStore = (initialState) => {
//   return createStore(
//     reducers,
//     initialState,
//     applyMiddleware(thunk)
//   );
// };

const Store = createStore(reducers,
    compose(applyMiddleware(thunk))
);

export default Store;
