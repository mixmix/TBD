//import utils
import _ from 'lodash'
import request from 'superagent'
//import modules
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
     filtered: [],
     searchString: "",
     possibleLocations: []
   }
 }

 componentDidMount() {
   this.getPossibleLocations()
 }

 getPossibleLocations() {
   //send request to get possible locations
   request.get('/locations')
          .end(( err, res ) => {
            let possibleLocations = JSON.parse(res.text)
            possibleLocations = possibleLocations.countries
            this.setState({
              ...this.state,
              possibleLocations: possibleLocations
            })
          })
 }


  filterLocation(e, valueFromChild) {
    let searchTerm = valueFromChild ? valueFromChild.id : _.find(this.state.possibleLocations, [ 'id', e.target.value])
    let searchString = valueFromChild ? valueFromChild.name : e.target.value
    let matchingLocations = this.props.feeds.filter(possible => (possible.countryId === searchTerm))

    this.setState({
      ...this.state,
      filtered: matchingLocations,
      searchString: searchString
    })
  }

  changeSearchValue(value) {
    this.filterLocation(null, value)
  }

  keyChecker(e) {
    if (e.which === 13 ){
      this.changeSearchValue(null,)
    }
  }

  changeDisplay(){
    this.setState({
      ...this.state,
      grid:!this.state.grid
    })
  }

  render(){
    let content
    this.state.filtered.length > 0 ? content = this.state.filtered.map(cell => <Feed key={cell.id} {...cell}/>)
    : content = <Searching changeSearchValue={this.changeSearchValue.bind(this)} searchString={this.state.searchString} possibleLocations={this.state.possibleLocations} />;
    return (
      <div>
        <div class="settings-bar">
          <input value={this.state.searchString} onChange={this.filterLocation.bind(this)} type="search" placeholder="location" onKeyUp={this.keyChecker.bind(this)} />
          <div class="settings-btn" onClick={this.changeDisplay.bind(this)}>grid</div>
        </div>
        <div class={this.state.grid ? 'feed-container grid' : 'feed-container'}>
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
