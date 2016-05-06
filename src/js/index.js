
//import the libs
import React,{Component}       from 'react'
import {render}                from 'react-dom'
import { Provider }            from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { syncHistoryWithStore} from 'react-router-redux'
import { createStore }         from 'redux'
import request                 from 'superagent'
//import the reducer
import reducer        from './reducers'
//import the components
import Layout         from './components/pages/layout'
import Feedcontainer  from './components/pages/feedcontainer'
import Imagepage      from './components/pages/imagepage'
import Profile        from './components/pages/profile'
import Location       from './components/pages/location'
import Login          from './components/pages/login'

const store = createStore(reducer)
const history = syncHistoryWithStore(hashHistory, store)

class App extends Component{
 componentDidMount(){
   request.get('/getFeed')
          .end((err,feeds)=>{
            feeds=JSON.parse(feeds.text)
            store.dispatch({type:'LOAD_FEEDS',feeds})
          })
 }
 render(){
   return (
     <Provider store={store}>
       <Router history={history}>
         <Route path="/" component={Layout}>
           <IndexRoute component={Feedcontainer}></IndexRoute>
           <Route path="photo/:id" component={Imagepage}></Route>
           <Route path="profile" component={Profile}></Route>
           <Route path='location' component={Location}></Route>
           <Route path='login' component={Login}></Route>
         </Route>
       </Router>
     </Provider>
   )
 }
}

render(<App />, document.getElementById('app'))
