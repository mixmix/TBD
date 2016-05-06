import React,{Component} from 'react'
import request           from 'superagent'
import { connect } from 'react-redux'

class Login extends Component{
 handleLogin(e){
   e.preventDefault()
   let email = this.refs.email.value
   let password= this.refs.password.value
   let {successLogin,loginFail} = this.props
   request.post('/users/login')
          .send({email,password})
          .end((err,user)=>{
            if(err){
              loginFail()
            }else{
              successLogin(user)
            }
          })
 }
 render(){
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
     </div>
   )
 }
}

const mapDispatchToProps= (dispatch) =>{
  return {
    successLogin :(user)=>{
      dispatch({type:'USER_LOGIN',user})
    },
    loginFail :()=>{
      dispatch({type:'USER_LOGIN_FAIL'})
    }
  }
}

export default connect(null,mapDispatchToProps)(Login)
