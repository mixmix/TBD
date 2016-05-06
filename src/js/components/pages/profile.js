import React,{Component} from 'react'
import {connect}         from 'react-redux'

class Profile extends Component{
 render(){
   if(this.props.user){
     var {photos,name,content}= this.props.user
     photos.length>0 ?
     content = photos.map((photo)=>{
       return <img src='photo' />
     }) : content="You dont have any photos yet...";
   }else{
     var name='visitor'
     var content='please login to post some photos'
   }

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
