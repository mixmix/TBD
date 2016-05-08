import React,{Component} from 'react'
import {connect}         from 'react-redux'

class Profile extends Component{
 render(){
   var {photos,name,content}= this.props.user
   content = photos.length>0 ? photos.map((photo)=>{
     return <img src='photo' />
   }) : <h3>You dont have any photos yet...</h3>;
   return (
     <div>
        <h2>Welcome {name}</h2>
        {content}
     </div>
   )
 }
}

const mapStateToProps = (state) =>{
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps
)(Profile)
