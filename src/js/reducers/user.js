
const initUser={}

export default (state=initUser,action) =>{
  switch (action.type) {
    case 'USER_LOGIN':
      return action.user
      break;
    default:
      return state

  }
}
