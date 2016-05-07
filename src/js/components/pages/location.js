import React,{Component} from 'react'
import { connect } from 'react-redux'
// components
import Feed  from '../feed'
import Searching from './searching'

class Location extends Component{
 constructor(props){
   super(props)
   this.state={
     grid: false,
     feeds: this.props.feeds,
     filtered: []
   }
 }

 componentDidMount() {
   this.getPossibleLocations()
 }

 getPossibleLocations() {
   //send ajax to get possible locations
  //  request.get('/locations')
  //         .end(( err, res ) =>{
  //           let possibleLocations = JSON.parse(res.text)
  //           store.dispatch({type:'FILTER_FEED_LOCATION', possibleLocations})
  //         })
  let fakeLocations = {
    cities: ["Toronto", "Wellington", "Auckland", "Tokyo"],
    countries: ["NZ", "AUS", "USA"]
  }
  this.props.dispatch({
    type: 'FILTER_FEED_LOCATION',
    possibleLocations: fakeLocations })
 }

  filterLocation(e) {
    //?when api is up change country and city to countries and cities?
    let searchTerm = e.target.value
    let matchingLocations = this.props.feeds.filter(possible => (possible.city === searchTerm || possible.country === searchTerm))
    // console.log('filtered', matchingLocations)
    // console.log('state in filter',this.state)
    this.setState({
      ...this.state,
      filtered: matchingLocations
    })
  }

  changeDisplay(){
    this.setState({
      ...this.state,
      grid:!this.state.grid
    })
  }

  render(){
    // console.log('props', this.props.feeds)
    console.log('before-render',this.state)
    let content
    this.state.filtered.length > 0 ? content = this.state.filtered.map(cell => <Feed key={cell.id} {...cell}/>)
    : content = <h1>Loading</h1>;
    return (
      <div>
        <div class="settings-bar">
          <input onChange={this.filterLocation.bind(this)} type="search" placeholder="location" />
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
  return { ...state }
}

// export for test
export { Location }

export default connect(
  mapStateToProps
)(Location)
