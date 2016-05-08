import React,{Component} from 'react'
import {postSignin}      from '../reducers'
import { connect }       from 'react-redux'

class Signin extends Component{
 handleLogin(e){
   e.preventDefault()
   let email = this.refs.email.value
   let password= this.refs.password.value
   let {successLogin,history} = this.props
   postSignin('/users/login',{email,password},history,successLogin)
 }
 render(){
   return (
     <div>
        <form>
          <label>Email:</label>
          <input type="email" name="emal" ref='email' required/><br/>
          <label>Password:</label>
          <input type="password" name="password" ref='password' required/>
          <button onClick={this.handleLogin.bind(this)} type='submit'>Log In</button>
        </form>
        <div class="sign-ins">
          <a href='auth/facebook'>facebook</a>
          <a href='auth/instagram'>instagram</a>
        </div>
     </div>
   )
 }
}

const mapDispatchToProps= (dispatch) =>{
  return {
    successLogin :(user)=>{
      dispatch({type:'USER_LOGIN',user})
    }
  }
}

export default connect(null,mapDispatchToProps)(Signin)

export {Signin}
