
//import the libs
import React,{Component}       from 'react'
import {render}                from 'react-dom'
import { Provider }            from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from "react-router";
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

const store = createStore(reducer)
const history = syncHistoryWithStore(hashHistory, store)




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
