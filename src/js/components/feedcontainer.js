import React,{Component} from 'react'
import { connect } from 'react-redux'
// components
import Feed  from './feed'

class FeedContainer extends Component{
 render(){
   console.log('hhhhh',this.props)
   const { feeds } = this.props
   return (
     <div className="feed-container">
        {feeds.slice(0,4).map(feed => <Feed key={feed.id} {...feed}/>)}
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
