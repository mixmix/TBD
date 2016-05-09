
const initUser={name:'visitor',photos:[]}

export default (state=initUser,action) =>{
  switch (action.type) {
    case 'USER_DID_LOGIN':
      return Object.assign({},state,action.user)
      //break; //not needed
    case 'DID_ADD_IMAGE_TO_FEED':
      const nextState= Object.assign({},state)
      nextState.photos.push(action.feed)
      return nextState
    default:
      return state

  }
}
