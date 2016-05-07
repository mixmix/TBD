let fakeState = {
  images: []
}

export default function (state=fakeState.images, action){
  switch (action.type) {
    case 'LOAD_FEEDS':
      return action.feeds
      break;
    case 'PASS_PHOTO':
      return state
      break;
    case 'ADD_NEW_FEED':
      let nextState= state.concat([])
      nextState.push(action.feed)
      return nextState
      break;
    default:
      return state
  }
}
