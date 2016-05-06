import React,{Component} from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import * as actions from '../../actions'

export default class ImagePage extends Component{
  nextPhoto(history,id){
    let url='photo/'+Number((Number(id)+1))
    history.replace(url)
  }
  likePhoto(id){
    let {fleekPhoto,history,feeds} = this.props
    fleekPhoto(id)
    // show next photo
    if(id<feeds.length){
      this.nextPhoto(history,id)
    }else{
      // ask server for more feeds
    }
  }
  dislikePhoto(id){
    let {passPhoto,history,feeds} = this.props
    passPhoto(id)
    // show next photo
    if(id<feeds.length){
      this.nextPhoto(history,id)
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
        <img src={feed.link} />
        <div>
          <button onClick={this.likePhoto.bind(this,id)}>Pass</button>
          <button onClick={this.dislikePhoto.bind(this,id)}>On Fleek</button>
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

const mapDispatchToProps = (dispatch) =>{
  return {
    passPhoto: (id) => { dispatch(actions._passPhoto(id)) },
    fleekPhoto: (id) => { dispatch(actions._fleekPhoto(id)) }
  }
}

// export for test
export {ImagePage}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagePage)
