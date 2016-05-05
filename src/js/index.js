import React,{Component} from 'react'
import {render} from 'react-dom'


class App extends Component{
 render(){
   return (
     <h1>Hello {this.props.name}</h1>
   )
 }
}


render(<App name='Ollie'/>, document.getElementById('app'))
