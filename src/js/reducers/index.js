
import { combineReducers } from 'redux'
import { routerReducer }   from 'react-router-redux'
import request             from 'superagent'

import feeds      from './feeds'
import user       from './user'
import categories from './categories'
import filter     from './filter'

export default combineReducers({
  feeds,
  user,
  categories,
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

const postSignin =(url,userInfo,history,cb) =>{
  request.post(url)
         .send(userInfo)
         .end((err,user)=>{
           if(err){
             console.log('login err',err)
           }else{
             user=JSON.parse(user.text)
             console.log('after sign up',user)
             cb(user)
             history.push('/')
           }
         })
}

const loadFeeds = (dispatch) =>{
  request.get('/getFeed')
         .end((err,feeds)=>{
           feeds=JSON.parse(feeds.text)
           dispatch({type:'LOAD_FEEDS',feeds})
         })
}

export {
  postVotes,
  postNewFeed,
  postSignin,
  loadFeeds
}
