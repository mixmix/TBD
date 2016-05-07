
import { combineReducers } from 'redux'
import { routerReducer }   from 'react-router-redux'
import request             from 'superagent'

import feeds  from './feeds'
import user   from './user'

export default combineReducers({
  feeds,
  user,
  routing: routerReducer
})


const postVotes = (vote) => {
  request.post('/users/vote')
         .send(vote)
         .end()
}

export {
  postVotes
}
