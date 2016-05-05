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
    default:
      return state
  }
}
