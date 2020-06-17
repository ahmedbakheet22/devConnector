import axios from 'axios'
import {REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from './types'
import {setAlert} from './alert'
import setAuthToken from '../utils/setAuthToken'


//LOAD USER

export const loadUser=() => async dispach =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res =await axios.get('/api/auth')
        dispach({
            type:USER_LOADED,
            payload:res.data
        })
    } catch (error) {
        dispach({
            type:AUTH_ERROR
        })
    }
}
//register user


export const register = ({name,email,password})=>async dispach=>{

    const config={
        headers:{
            'content-type':'application/json'
        }
        
    }

    const body =JSON.stringify({name,email,password})
    try {
            const res = await axios.post('/api/users',body,config)
            dispach({
                type:REGISTER_SUCCESS,
                payload:res.data
            })
            dispach(loadUser())
 
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(error => {
                dispach(setAlert(error.msg,'danger'))
            });
        }
        dispach({
            type:REGISTER_FAIL
        })
    }
}


//login user
export const login = (email,password)=>async dispach=>{

    const config={
        headers:{
            'content-type':'application/json'
        }
        
    }

    const body =JSON.stringify({email,password})
    try {
            const res = await axios.post('/api/auth',body,config)
            dispach({
                type:LOGIN_SUCCESS,
                payload:res.data
            })
            dispach(loadUser())
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(error => {
                dispach(setAlert(error.msg,'danger'))
            });
        }
        dispach({
            type:LOGIN_FAIL
        })
    }
}

//logout / clear profile

export const logout = () => dispach => {
    dispach({
        type:LOGOUT 
    })
}
