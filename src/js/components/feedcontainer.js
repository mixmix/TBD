import React,{Component} from 'react'
import { connect } from 'react-redux'
// components
import Feed  from './feed'

export default class FeedContainer extends Component{
 render(){
   return (
     <div>
        this is the feed container dfdfd
     </div>
   )
 }
}

// const mapStateToProps = (state) => {
//   return {
//     feeds : state.feeds
//   }
// }

// export for test
export {FeedContainer}
//
// export default connect({
//   mapStateToProps
// })(FeedContainer)
