import React,{Component} from 'react'

export default class Login extends Component{
 render(){
   return (
     <div>
        <form>
          <label>Email:</label>
          <input type="email" name="emal" ref='email'/><br/>
          <label>Password:</label>
          <input type="password" name="password" ref='password'/>
          <button>Log In</button>
        </form>
        <div>
          <a href='auth/facebook'>facebook</a>
          <a href='auth/instagram'>instagram</a>
        </div>
     </div>
   )
 }
}
