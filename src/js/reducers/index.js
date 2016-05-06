
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import feeds from './feeds'
import user from './user'
import filter from './filter'

export default combineReducers({
  feeds,
  user,
  routing: routerReducer,
  filter
})
