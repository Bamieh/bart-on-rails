import { combineReducers } from 'redux'
import locationReducer from './location'
import recentReducer from './recent'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    recent: recentReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
