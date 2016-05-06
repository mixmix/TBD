import React,{Component} from 'react'
import Signin            from '../signinForm'
import Signup            from '../signupForm'

export default class Login extends Component{
  constructor(){
    super()
    this.state={
      status:true
    }
  }

  handleClick(){
    this.setState({status: !this.state.status})
  }

 render(){
   let button, form;
   if(this.state.status){
     button= <button onClick={this.handleClick.bind(this)}>Sign Up</button>
     form= <Signin history={this.props.history}/>
   }else{
     button= <button onClick={this.handleClick.bind(this)}>Sign In</button>
     form= <Signup history={this.props.history}/>
   }
   return (
     <div class="login">
       <div class="logo">
         <img src="images/corgi.svg" />
         <h1>on-fleek</h1>
       </div>
        <form>
          <label>Email:</label>
          <input type="email" name="emal" ref='email' required/><br/>
          <label>Password:</label>
          <input type="password" name="password" ref='password' required/>
          <button onClick={this.handleLogin.bind(this)}>Log In</button>
        </form>
        <div class="sign-ins">
          <a href='auth/facebook' class="sign-in-btn">facebook</a>
          <a href='auth/instagram' class="sign-in-btn">instagram</a>
        </div>
        {form}
        {button}
     </div>
   )
 }
}
