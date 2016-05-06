import React,{Component} from 'react'
import { connect } from 'react-redux'
// components
import Feed  from '.././feed'

class FeedContainer extends Component{

 render(){
   const { feeds } = this.props
   let content
   feeds.length>0 ? content=feeds.map(feed => <Feed key={feed.id} {...feed}/>)
   : content=<h1>Loading</h1> ;
   return (
     <div class="feed-container">
      {content}
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
export {FeedContainer}

export default connect(
  mapStateToProps
)(FeedContainer)
