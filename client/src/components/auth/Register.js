import React,{Fragment,useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../actions/alert'
import {register} from '../../actions/auth'
import PropTypes from 'prop-types'



/*
this was in the original
const Register = (props) => {
  and destructed to the actions in props
  so props.setAlert transformed into setAlert
by doing the destruction here 
const Register = ({setAlert}) => {

*/

const Register = ({setAlert,register,isAuthenticated}) => {
   const [formData,useFormData]= useState({
       name:'',
       email:'',
       password:'',
       passwordConfirmation:''
   })

   const {name,email,password,passwordConfirmation}=formData
   const ChangeHandler = (e) => {
       useFormData({
           ...formData,
           [e.target.name]:e.target.value
       })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password!=passwordConfirmation){
            console.log('password do not match')
            setAlert('password do not match','danger')
        }
        else{
          register({name,email,password})
            
        }
     }
      if(isAuthenticated){
        return <Redirect to="/dashboard"/>
      }
    return (
        <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" action="create-profile.html" onSubmit={e=>handleSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name"  value={name}  onChange={e=>ChangeHandler(e)}/>
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email"   value={email}  onChange={e=>ChangeHandler(e)}/>
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e=>ChangeHandler(e)}
            
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={e=>ChangeHandler(e)}
            
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
        </Fragment>
    )
}

Register.protoTypes={
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
  
}
const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{setAlert,register})(Register)
