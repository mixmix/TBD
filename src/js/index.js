//import the stylesheets
import '../style/index.scss'
//import the libs
import React,{Component}       from 'react'
import {render}                from 'react-dom'
import { Provider }            from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { syncHistoryWithStore} from 'react-router-redux'
import { createStore }         from 'redux'
import request                 from 'superagent'
//import the reducer
import reducer,{loadFeeds}     from './reducers'
import { _updatePossibleLocations } from './actions'
//import the components
import Layout         from './components/pages/layout'
import Feedcontainer  from './components/pages/feedcontainer'
import Imagepage      from './components/pages/imagepage'
import Profile        from './components/pages/profile'
import Location       from './components/pages/location'
import Login          from './components/pages/login'
import Upload         from './components/pages/upload'

const store = createStore(reducer)
const history = syncHistoryWithStore(browserHistory, store)

class App extends Component{
 componentDidMount(){

   loadFeeds(store.dispatch)

   request.get('/getCategories')
          .end((err,categories) => {
            categories= JSON.parse(categories.text)
            store.dispatch({type:'LOAD_CATEGORIES',categories})
          })
   request.get('/locations')
         .end((err, res) => {
           let possibleLocations = JSON.parse(res.text)
           possibleLocations = possibleLocations.countries
           store.dispatch(_updatePossibleLocations(possibleLocations))
         })
   request.get('/users/loggedIn')
          .end((err,user)=>{
            user = JSON.parse(user.text)
            if(user.name){
              store.dispatch({type:'USER_LOGIN',user})
            }
          })
 }
 render(){
   return (
     <Provider store={store}>
       <Router history={history}>
         <Route path="/" component={Layout}>
           <IndexRoute component={Feedcontainer}></IndexRoute>
           <Route path="/photo/:id" component={Imagepage}></Route>
           <Route path="/profile" component={Profile}></Route>
           <Route path='/location' component={Location}></Route>
           <Route path='/login' component={Login}></Route>
           <Route path='/upload' component={Upload}></Route>
         </Route>
       </Router>
     </Provider>
   )
 }
}

render(<App />, document.getElementById('app'))

$.cloudinary.config({ cloud_name: 'vicken', api_key: '226983578886724'})
