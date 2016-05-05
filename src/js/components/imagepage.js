import React,{Component} from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

export default class ImagePage extends Component{
 render(){
   let {id}= this.props.params
   let {feeds} = this.props
   let feed = _.find(feeds,['id',Number(id)]);
   console.log('feed',feed)
   return (
     <div>
        <img src={feed.imagelink} />
        <div>
          <button>Pass</button>
          <button>On Fleek</button>
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
