

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

}
