import React,{Component} from 'react'

export default class Searching extends Component{
  constructor(props) {
  super(props)

  }

  componentWillMount() {
    this.setState({
      searchString: this.props.searchString
    })
  }

  autofill(payload) {
    // console.log(payload.location)
    this.props.changeSearchValue(payload.location)
  }

  render(){
    return (
       <div className="searching">
         <h1>{this.props.searchString}</h1>
         <ul className="possible-locations">
           {this.props.possibleLocations.filter((location) => {
             let term = location.substring(0, this.props.searchString.length)
             return (term === this.props.searchString)
           }).map((location, i) => {

             return <li onClick={this.autofill.bind(this, {location})} key={i}>{location}</li>
           })}
         </ul>
       </div>
     )
   }
}


//TODO extract out the filter to a function to unclutter lines 10 - 13, it looks a little scary
