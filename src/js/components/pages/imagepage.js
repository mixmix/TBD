import React,{Component} from 'react'
import { connect }       from 'react-redux'
import _                 from 'lodash'

import * as actions from '../../actions'
import {postVotes}  from '../../reducers'

import Swipeable from 'react-swipeable'

export default class ImagePage extends Component{
  nextPhoto(history,id){
    let url='photo/'+(Number(id))
    history.replace(url)
  }
  likePhoto(id){
    let {fleekPhoto,history,feeds} = this.props
    // post to server
    postVotes({photoid : id, vote : 1})

    let currentIndex= _.findIndex(feeds,['id',Number(id)])
    let nextFeed= feeds[currentIndex+1]
    // show next photo
    if(nextFeed){
      this.nextPhoto(history,nextFeed.id)
    }else{
      // ask server for more feeds
    }
  }
  dislikePhoto(id){
    let {passPhoto,history,feeds} = this.props
    // post to server
    postVotes({photoid : id, vote : 0})

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
    console.log('Swiped down')

    let {history, feeds} = this.props
    let currentIndex= _.findIndex(feeds,['id',Number(id)])
    let nextFeed= feeds[currentIndex+1]
    // show next photo
    if(nextFeed){
      this.nextPhoto(history,nextFeed.id)
    }else{
      // ask server for more feeds
    }
  }
  addToFavorites(id){
    //add photo to favorites for future viewing
    console.log('Added to favorites')

    let {history, feeds} = this.props
    let currentIndex= _.findIndex(feeds,['id',Number(id)])
    let nextFeed= feeds[currentIndex+1]
    // show next photo
    if(nextFeed){
      this.nextPhoto(history,nextFeed.id)
    }else{
      // ask server for more feeds
    }
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
      <Swipeable onSwipedRight={this.likePhoto.bind(this, id)}
                 onSwipedLeft={this.dislikePhoto.bind(this, id)}
                 onSwipedDown={this.report.bind(this, id)}
                 onSwipedUp={this.addToFavorites.bind(this, id)}
                 preventDefaultTouchmoveEvent={false}
                 >
        <img src={feed.link} />
      </Swipeable>
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
    feeds : state.feeds
  }
}


// export for test
export {ImagePage}

export default connect(
  mapStateToProps
)(ImagePage)
