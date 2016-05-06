import React,{Component} from 'react'
import request           from 'superagent'
import { connect }       from 'react-redux'

class Signup extends Component{
 handleSignup(){
   e.preventDefault()
   let email = this.refs.email.value
   let Fullname= this.refs.name.value
   let password= this.refs.password.value
   let {successLogin,history} = this.props
   request.post('/users/new')
          .send({email,password,Fullname})
          .end((err,user)=>{
            if(err){
              console.log('signup err')
            }else{
              successLogin(user) // set user to state
              history.push('/') // lead user to home page
            }
          })
 }
 render(){
   return(
     <form>
       <label>Full Name:</label>
       <input type="text" name="Fullname" ref='name' required/><br/>
       <label>Email:</label>
       <input type="email" name="emal" ref='email' required/><br/>
       <label>Password:</label>
       <input type="password" name="password" ref='password' required/>
       <button onClick={this.handleSignup.bind(this)} type='submit'>Sign Up</button>
     </form>
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

export default connect(null,mapDispatchToProps)(Signup)
