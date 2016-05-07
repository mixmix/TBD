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
  componentDidMount() {
   this.getPossibleLocations()
  }

  getPossibleLocations() {
   //TODO move into the action creator
   request.get('/locations')
          .end((err, res) => {
            let possibleLocations = JSON.parse(res.text)
            possibleLocations = possibleLocations.countries
            this.props.dispatch({
              type: 'UPDATE_POSSIBLE_LOCATIONS',
              possibleLocations: possibleLocations
            })
          })
  }

  matchCountryNameToCode(name, id){
    let found = _.find(this.props.filter.possibleLocations, ['name', name])
    if (found) {
      return found.id
    }
    return null
  }

  handleInputChange(e) {
    let countryCode = this.matchCountryNameToCode(e.target.value)
    this.updateState(countryCode, e.target.value)
  }

  handleSelection(value) {
    this.updateState(value.id, value.name)
  }

  updateState(searchedID, currentSearchString = this.props.filter.searchString) {
    let matchingLocations = this.props.feeds.filter(possible => (possible.countryId === searchedID))
    this.props.dispatch({
      type: 'SET_MATCHING_LOCATIONS',
      filtered: matchingLocations
    })
    this.props.dispatch({
      type:'UPDATE_SEARCHSTRING',
      searchString: currentSearchString
    })
  }


  generateContentOrSearch = () => {
    //maybe refactor into an if rather than a ternary since it already looks rather dense
    return this.props.filter.filtered.length > 0 ? this.props.filter.filtered.map( cell => <Feed key={cell.id} {...cell}/>)
    : <Searching changeSearchValue={this.handleSelection.bind(this)} searchString={this.props.filter.searchString} possibleLocations={this.props.filter.possibleLocations} />
  }


  render(){
    let content = this.generateContentOrSearch()
    return (
      <div>
        <div class="settings-bar">
          <input
              value={this.props.filter.searchString}
              onChange={this.handleInputChange.bind(this)}
              type="search"
              placeholder="location"
          />
          </div>
          <div className="feed-container">
          {content}
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Location)
