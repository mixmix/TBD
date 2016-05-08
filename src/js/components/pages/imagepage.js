import React,{Component} from 'react'
import { connect }       from 'react-redux'
import _                 from 'lodash'

import * as actions from '../../actions'
import {postVotes}  from '../../reducers'

export default class ImagePage extends Component{
  nextPhoto(history,id){
    let url='photo/'+(Number(id))
    history.replace(url)
  }
  likePhoto(id){
    let {fleekPhoto,history,feeds,user} = this.props
    if(user.name === 'visitor'){
      history.push('login')
      return ;
    }
    fleekPhoto(id)
    // post to server
    postVotes({photoid : id, vote : 1})
    // bring a new feed to show
    this.handleVote(feeds,id,history)
  }
  dislikePhoto(id){
    let {passPhoto,history,feeds,user} = this.props
    if(user.name === 'visitor'){
      history.push('login')
      return ;
    }
    passPhoto(id)
    // post to server
    postVotes({photoid : id, vote : 0})
    // bring a new feed to show
    this.handleVote(feeds,id,history)
  }
  handleVote(feeds, id,history){
    let currentIndex= _.findIndex(feeds,['id',Number(id)])
    let nextFeed= feeds[currentIndex+1]? feeds[currentIndex+1] : feeds[0]
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
 render(){
   let {id}= this.props.params
   let {feeds} = this.props
   let feed = _.find(feeds,['id',Number(id)]);
   if(!feed){
     return(<h1>Loading</h1>)
   }
   return (
     <div>
        <img src={feed.link} />
        <div>
          <button onClick={this.dislikePhoto.bind(this,id)}>Pass</button>
          <button onClick={this.likePhoto.bind(this,id)}>On Fleek</button>
          <button onClick={this.followOwner.bind(this)}>Follow Me</button>

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
