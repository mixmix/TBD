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
     searchString: "",
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
  this.setState({
    ...this.state,
    possibleLocations: fakeLocations.cities.concat(fakeLocations.countries)
  })
  this.props.dispatch({
    type: 'FILTER_FEED_LOCATION',
    possibleLocations: fakeLocations
  })

 }


  filterLocation(e, valueFromChild) {
    //?when api is up change country and city to countries and cities?
    let searchTerm = valueFromChild || e.target.value
    let matchingLocations = this.props.feeds.filter(possible => (possible.city === searchTerm || possible.country === searchTerm))

    this.setState({
      ...this.state,
      filtered: matchingLocations,
      searchString: searchTerm
    })
  }

  changeSearchValue(value) {
    this.setState({
      ...this.state,
      searchString: value
    })
    this.filterLocation(null, value)
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
    : content = <Searching changeSearchValue={this.changeSearchValue.bind(this)} searchString={this.state.searchString} possibleLocations={this.state.possibleLocations}  ref="searchbar" />;
    return (
      <div>
        <div class="settings-bar">
          <input value={this.state.searchString} onChange={this.filterLocation.bind(this)} type="search" placeholder="location" />
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
