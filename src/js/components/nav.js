import React,{Component} from 'react'
import { Link } from "react-router";

export default class Nav extends Component{
 render(){
   const {location}=this.props
   let indexActive=location.pathname==='/'? 'active' : ''
   let profileActive=location.pathname.match(/^\/profile/)? 'active' : ''
   let locationActive=location.pathname.match(/^\/location/)? 'active' : ''
   return (
     <nav>
      <Link to='/' class={indexActive}>feeds</Link>
      <Link to='profile' class={profileActive}>profile</Link>
      <Link to='location' class={locationActive}>location</Link>
     </nav>
   )
 }
}
