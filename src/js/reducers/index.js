
import { combineReducers } from 'redux'
import { routerReducer }   from 'react-router-redux'
import request             from 'superagent'

import feeds      from './feeds'
import user       from './user'
import categories from './categories'

export default combineReducers({
  feeds,
  user,
  categories,
  routing: routerReducer
})


const postVotes = (vote) => {
  request.post('/users/vote')
         .send(vote)
         .end()
}

const postNewFeed = (photo) => {
  request.post('/users/newImage')
         .send(photo)
         .end()
}


export {
  postVotes,
  postNewFeed
}
