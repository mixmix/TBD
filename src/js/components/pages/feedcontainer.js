import React,{Component} from 'react'
import { connect } from 'react-redux'
// components
import Feed  from '.././feed'

class FeedContainer extends Component{
 constructor(){
   super()
   this.state={
     grid:false
   }
 }
 changeDisplay(){
   this.setState({grid:!this.state.grid})
 }
 render(){
   const { feeds } = this.props
   let content
   feeds.length>0 ? content=feeds.map(feed => <Feed key={feed.id} {...feed}/>)
   : content=<h1>Loading</h1> ;
   return (
     <div>
        <div class="settings-bar">
          <div class="settings-btn" onClick={this.changeDisplay.bind(this)}>grid</div>
        </div>
        <div class={this.state.grid? 'feed-container grid' : 'feed-container'}>
          {content}
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
export {FeedContainer}

export default connect(
  mapStateToProps
)(FeedContainer)
