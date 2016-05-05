import React,{Component} from 'react'
import {render} from 'react-dom'
import Feed from './components/feed'

let fakeState = {
  images: [
    {
      link: "http://i.imgur.com/R2tE1Wg.jpg?1"
    },
    {
      link: "http://i.imgur.com/R2tE1Wg.jpg?1"
    },
    {
      link: "http://i.imgur.com/R2tE1Wg.jpg?1"
    },
    {
      link: "http://i.imgur.com/R2tE1Wg.jpg?1"
    }
  ]
}

class App extends Component{
 render(){
   return (
     <Feed data={fakeState} />
   )
 }
}


render(<App />, document.getElementById('app'))
