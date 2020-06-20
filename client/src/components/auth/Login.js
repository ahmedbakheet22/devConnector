import React,{Fragment,useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../../actions/auth' 



const Login = ({login,isAuthenticated}) => {




   const [formData,useFormData]= useState({
       email:'',
       password:'',
   })

   const {email,password}=formData
   const ChangeHandler = (e) => {
       useFormData({
           ...formData,
           [e.target.name]:e.target.value
       })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        login(email,password)


     }

     

    //  redirect if loged in
     if(isAuthenticated){
       return <Redirect to="/dashboard"/>
     }
    return (
        <Fragment>
      <h1 className="large text-primary">Login </h1>
      <p className="lead"><i className="fas fa-user"></i> Login to Your Account</p>
      <form className="form" onSubmit={e=>handleSubmit(e)}>
        
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" required value={email}  onChange={e=>ChangeHandler(e)}/>
         
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e=>ChangeHandler(e)}
            required
          />
        </div>
   
        <input type="submit" className="btn btn-primary" value="login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sing Up </Link>
      </p>
        </Fragment>
    )
}

Login.propTypes={
  login:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
}

const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login)
