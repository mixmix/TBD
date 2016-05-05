import React,{Component} from 'react'
import { Link } from "react-router";

export default class Feed extends Component{
 render(){
   const {imagelink,id}= this.props
   return (
     <div className="feed">
      <Link to={`photo/${id}`}><img src={imagelink} /></Link>
     </div>
   )
 }
}
