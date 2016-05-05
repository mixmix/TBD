
//import the stylesheets
import '../style/index.scss'
//import the libs
import React,{Component}       from 'react'
import {render}                from 'react-dom'
import { Provider }            from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { syncHistoryWithStore} from 'react-router-redux'
import { createStore }         from 'redux'
//import the reducer
import reducer        from './reducers'
//import the components
import Layout         from './components/layout'
import Feedcontainer  from './components/feedcontainer'
import Imagepage      from './components/imagepage'
import Profile        from './components/profile'
import Location       from './components/location'
import Landing        from './components/landing.js'

const store = createStore(reducer)
const history = syncHistoryWithStore(browserHistory, store)


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
     <Provider store={store}>
       <Router history={history}>
         <Route path="/" component={Layout}>
           <IndexRoute component={Feedcontainer}></IndexRoute>
           <Route path="photo/:id" component={Imagepage}></Route>
           <Route path="profile" component={Profile}></Route>
           <Route path='location' component={Location}></Route>
         </Route>
       </Router>
     </Provider>
   )
 }
}

render(<App />, document.getElementById('app'))
