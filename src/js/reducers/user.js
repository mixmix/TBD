
const initUser={name:'visitor',photos:[]}

export default (state=initUser,action) =>{
  switch (action.type) {
    case 'USER_LOGIN':
      return Object.assign({},state,action.user)
      break;
    case 'ADD_NEW_FEED':
      let nextState= Object.assign({},state)
      nextState.photos.push(action.feed)
      return nextState
      break;
    default:
      return state

  }
}
