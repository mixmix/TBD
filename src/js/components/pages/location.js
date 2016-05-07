import React,{Component} from 'react'
import { connect } from 'react-redux'
// components
import Feed  from '../feed'
import Searching from './searching'
import _ from 'lodash'

class Location extends Component{
 constructor(props){
   super(props)
   this.state={
     grid: false,
     feeds: this.props.feeds,
     filtered: [],
     searchString: "Loading",
     possibleLocations: []
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
  console.log('state gets set here')
  this.setState({
    ...this.state,
    possibleLocations: fakeLocations.cities.concat(fakeLocations.countries)
  })
  this.props.dispatch({
    type: 'FILTER_FEED_LOCATION',
    possibleLocations: fakeLocations
  })

 }

  filterLocation(e) {
    //?when api is up change country and city to countries and cities?
    let searchTerm = e.target.value
    let matchingLocations = this.props.feeds.filter(possible => (possible.city === searchTerm || possible.country === searchTerm))
    // console.log('filtered', matchingLocations)
    // console.log('state in filter',this.state)
    this.setState({
      ...this.state,
      filtered: matchingLocations,
      searchString: searchTerm
    })
  }

  changeDisplay(){
    this.setState({
      ...this.state,
      grid:!this.state.grid
    })
  }

  render(){
    // console.log('state', this.state)
    let content
    this.state.filtered.length > 0 ? content = this.state.filtered.map(cell => <Feed key={cell.id} {...cell}/>)
    : content = <Searching searchString={this.state.searchString} possibleLocations={this.state.possibleLocations} />;
    return (
      <div>
        <div class="settings-bar">
          <input onChange={this.filterLocation.bind(this)} type="search" placeholder="location" ref="searchbar" />
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
