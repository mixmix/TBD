import React,{Component} from 'react'
import {connect}         from 'react-redux'

class Profile extends Component{
 render(){
   var {photos,name,content}= this.props.user
   content = photos.length>0 ? photos.map((photo)=>{
     return <div className='feed' key={photo.id}>
                <img src={photo.link} />
                <h3>votes:{photo.rating>0? photo.rating : 'looks all good'}</h3>
            </div>
   }) : <h3>Why don't you upload some photos?</h3>;
   return (
     <div>
       <div className='settings-bar'>
        <h2>{name}</h2>
       </div>
       <div className="feed-container">
         <div>
            <h1>Recent Uploads</h1>
            {content}
            <h1>Voted Photos</h1>
            {content}
            <h1>Voted Photos</h1>
            {content}
         </div>
       </div>
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


///recent uploads

///voted photos

///On fleek
