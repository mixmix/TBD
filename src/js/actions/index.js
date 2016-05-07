import request from 'superagent'

const _updatePossibleLocations = (locations) => {
  return {
    type: 'UPDATE_POSSIBLE_LOCATIONS',
    possibleLocations: locations
  }
}

const _setMatchingLocations = (matching) => {
  return  {
    type: 'SET_MATCHING_LOCATIONS',
    filtered: matching
  }
}


const _updateSearchString = (str) => {
  return  {
    type:'UPDATE_SEARCHSTRING',
    searchString: str
  }
}


const _passPhoto = (id) =>{
  return {
    type:'PASS_PHOTO',
    id
  }
}

const _fleekPhoto = (id) =>{
  return {
    type:'FLEEK_PHOTO',
    id
  }
}



export {
  _passPhoto,
  _fleekPhoto,
  _updatePossibleLocations,
  _setMatchingLocations,
  _updateSearchString
}
