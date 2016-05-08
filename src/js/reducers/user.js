
const initUser={name:'visitor',photos:[]}

export default (state=initUser,action) =>{
  switch (action.type) {
    case 'USER_LOGIN':
      return Object.assign({},state,action.user)
      break;
    default:
      return state

  }
}
