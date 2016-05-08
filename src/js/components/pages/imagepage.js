import React,{Component} from 'react'
import { connect }       from 'react-redux'
import _                 from 'lodash'

import * as actions from '../../actions'
import {postVotes}  from '../../reducers'

import Swipeable from 'react-swipeable'

export default class ImagePage extends Component{
  nextPhoto(history,id){
    let url='/photo/'+(Number(id))
    history.replace(url)
  }

  handleRight(id) {
    document.querySelector('.single-view').classList.add('slide-right')
    let timerID = window.setTimeout(() => {
      this.likePhoto(id)
    }, 300)
  }

  handleLeft(id) {
    document.querySelector('.single-view').classList.add('slide-left')
    let timerID = window.setTimeout(() => {
      this.likePhoto(id)
    }, 300)
  }

  likePhoto(id){
    document.querySelector('.single-view').classList.remove('slide-right')
    window.clearTimeout("timerID")
    let {fleekPhoto,history,feeds,user} = this.props
    if(user.name === 'visitor'){
      history.push('login')
      return ;
    }
    fleekPhoto(id)
    // post to server
    postVotes({photoId : id, vote : 1})
    // bring a new feed to show
    this.handleVote(feeds,id,history)
  }
  dislikePhoto(id){
    document.querySelector('.single-view').classList.remove('slide-left')
    window.clearTimeout("timerID")
    let {passPhoto,history,feeds,user} = this.props
    if(user.name === 'visitor'){
      history.push('login')
      return ;
    }
    passPhoto(id)
    // post to server
    postVotes({photoId : id, vote : 0})
    // bring a new feed to show
    this.handleVote(feeds,id,history)
  }
  handleVote(feeds, id,history){
    let currentIndex= _.findIndex(feeds,['id',Number(id)])
    let nextFeed= feeds[currentIndex+1]
    // show next photo
    if(nextFeed){
      this.nextPhoto(history,nextFeed.id)
    }else{
      // ask server for more feeds
    }
  }
  followOwner(){
    // darken color of this button, and post to server
  }
  report(id){
    //report inappropriate photo
    let {history, feeds} = this.props
    this.handleVote(id)
  }
  addToFavorites(id){
    //add photo to favorites for future viewing
    let {history, feeds} = this.props
    this.handleVote(id)
  }
 render(){
   let {id}= this.props.params
   let {feeds} = this.props
   let feed = _.find(feeds,['id',Number(id)]);
   let photoId = feed.id
   if(!feed){
     return(<h1>Loading</h1>)
   }
   return (
     <div className="single-view" ref="container">
      <Swipeable className="single-photo-wrapper"
                 onSwipedRight={this.handleRight.bind(this, id)}
                 onSwipedLeft={this.handleLeft.bind(this, id)}
                 onSwipedDown={this.report.bind(this, id)}
                 onSwipedUp={this.addToFavorites.bind(this, id)}
                 preventDefaultTouchmoveEvent={false}
                 >
        <img src={feed.link} />
      </Swipeable>
      <span>up</span><span>down</span><span>left</span><span>right</span>
        <div className="single-controls">
          <button className="btn pass" onClick={this.handleLeft.bind(this,id)}>meh.</button>
          <button className="btn fleek" onClick={this.handleRight.bind(this,id)}>fleek!</button>
          <button className="btn" onClick={this.followOwner.bind(this)}>follow.</button>

        </div>
     </div>
   )
 }
}


const mapStateToProps = (state) => {
  return {
    feeds : state.feeds,
    user : state.user
  }
}

const mapDispatcherToProps =(dispatch) => {
  return {
    fleekPhoto: (id) =>{
      dispatch(actions._fleekPhoto(id))
    },
    passPhoto: (id) =>{
      dispatch(actions._passPhoto(id))
    }
  }
}

// export for test
export {ImagePage}

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(ImagePage)
