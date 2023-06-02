import {legacy_createStore as createStore, combineReducers, applyMiddleware, compose} from 'redux'
import articleReducer from './articles/reducerArticles'
import panierReducer from './panier/reducerPanier'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    article_key: articleReducer,
    panier_key: panierReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const store = createStore(rootReducer);
export default store;