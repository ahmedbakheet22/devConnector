import axios from 'axios'
import {setAlert} from './alert'
import {GET_PROFILE,PROFILE_ERROR} from './types'
import {api} from '../serviceUrl'

//get cuurent user profile


export const getCurrentProfile=() => async dispach =>{

    console.log('sss')
    try {
        const res =await axios.get(`${api}/api/profile/me`)

    console.log('aaa')

    dispach({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispach({
            type:PROFILE_ERROR,
            payload:{
                msg:error.response&&error.response.statusText,
                status:error.response&&error.response.status
            }
        })
    }
} 


// create/update profile

export const createProfile=(formData,history,edit=false)=>async dispach=>{
    try {
        const config={
            headers:{
                "Content-Type":'application/json'
            }
        }

        const res= await axios.post(`${api}/api/profile`,formData,config)
        dispach({
            type:GET_PROFILE,
            payload:res.data
        })

        dispach(setAlert(edit?'profile Updated':'profile Created','success'))
        if(!edit){
            history.push('/dashboard')
        }
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(error => {
                dispach(setAlert(error.msg,'danger'))
            });
        }
         
        dispach({
            type:PROFILE_ERROR,
            payload:{
                msg:error.response&&error.response.statusText,
                status:error.response&&error.response.status
            }
        })
    }
}