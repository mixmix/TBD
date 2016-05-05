import React,{Component} from 'react'
import { Link } from "react-router";
export default class Layout extends Component{
 render(){
   return (
     <div>
      <Link to='/'>feeds</Link>
      <Link to='profile'>profile</Link>
      <Link to='location'>location</Link>
      <Link to='photo/1'>foto</Link>
       {this.props.children}
     </div>
   )
 }
}
