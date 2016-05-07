let fakeState = {
  possibleLocations: {}
}


export default function (state=fakeState.possibleLocations, action){
  switch (action.type) {
    case 'FILTER_FEED_LOCATION':
      // action.possibleLocations
      return Object.assign({}, state, action.possibleLocations)
    default:
      return state
  }
}
