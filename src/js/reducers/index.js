
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import feeds from './feeds'

export default combineReducers({
  feeds,
  routing: routerReducer
})
