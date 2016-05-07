
import { combineReducers } from 'redux'
import { routerReducer }   from 'react-router-redux'
import request             from 'superagent'

import feeds from './feeds'
import user from './user'
import filter from './filter'


export default combineReducers({
  feeds,
  user,
  routing: routerReducer,
  filter
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

const getCategories = (cb) => {
  request.get('/')
         .end((err,data) => {
           cb(data)
         })
}

export {
  postVotes,
  postNewFeed
}
