import React,{Component} from 'react'

export default class Searching extends Component{
 render(){
  //  console.log('searching for', this.props)
   return (
     <div className="searching">
       <h1>{this.props.searchString}</h1>
       <ul className="possible-locations">
         {this.props.possibleLocations.map((location, i) => {
           let term = location.substring(0, this.props.searchString.length)
           console.log(term)
           return <li key={i}>{location}</li>
         })}
       </ul>
     </div>
   )
 }
}
