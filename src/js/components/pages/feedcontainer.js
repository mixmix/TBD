import React,{Component} from 'react'
import { connect } from 'react-redux'
// components
import Feed  from '.././feed'

class FeedContainer extends Component{

 render(){
<<<<<<< HEAD:src/js/components/feedcontainer.js
  //  console.log('props in feed container',this.props)
=======
>>>>>>> b45ed316a15c1554a82fd057f6beae77b7f18ff7:src/js/components/pages/feedcontainer.js
   const { feeds } = this.props
   let content
   feeds.length>0 ? content=feeds.map(feed => <Feed key={feed.id} {...feed}/>)
   : content=<h1>Loading</h1> ;
   return (
<<<<<<< HEAD:src/js/components/feedcontainer.js
     <div className="feed-container">
        {feeds.slice(0,4).map(feed => <Feed key={feed.id} {...feed}/>)}
=======
     <div>
      {content}
>>>>>>> b45ed316a15c1554a82fd057f6beae77b7f18ff7:src/js/components/pages/feedcontainer.js
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
