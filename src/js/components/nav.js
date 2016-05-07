import React,{Component} from 'react'
import { Link }          from "react-router";
import {connect}         from 'react-redux'

class Nav extends Component{
 render(){
   const {location,user}=this.props
   let indexActive=location.pathname==='/'? 'active' : ''
   let profileActive=location.pathname.match(/^\/profile/)? 'active' : ''
   let locationActive=location.pathname.match(/^\/location/)? 'active' : ''
   const customizedNav= user.name!=='visitor'?
   [<Link to='upload'>Upload</Link>,
   <Link to='profile' class={profileActive}>profile</Link>] :
   <Link to='login'>login</Link>
   return (
     <nav>
      <Link to='/' class={indexActive}>feeds</Link>
      <Link to='location' class={locationActive}>location</Link>
      {customizedNav}
     </nav>
   )
 }
}

export {Nav}

const mapStatetoProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStatetoProps
)(Nav)
