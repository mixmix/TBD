let fakeState = {
  images: []
}

export default function (state=fakeState.images, action){
  switch (action.type) {
    case 'LOAD_FEEDS':
      return action.feeds
      break;
    case 'PASS_PHOTO':{
      const nextState = state.filter((o) => o.id !== Number(action.id))
      return nextState
      break;}
    case 'FLEEK_PHOTO':{
      const nextState = state.filter((o) => o.id !== Number(action.id))
      return nextState
      break;}
    default:
      return state
  }
}
