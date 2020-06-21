import axios from 'axios'
import {setAlert} from './alert'
import {GET_PROFILE,PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE,ACCOUNT_DELETED,GET_PROFILES,GET_REPOS} from './types'
import {api} from '../serviceUrl'

//get cuurent user profile

export const getCurrentProfile=() => async dispach =>{

    try {
        const res =await axios.get(`${api}/api/profile/me`)


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

// get all profiles
export const getProfiles=() => async dispach =>{
    dispach({
        type:CLEAR_PROFILE
    })
    
    try {
        const res =await axios.get(`${api}/api/profile`)


    dispach({
            type:GET_PROFILES,
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

// get profile by id
export const getProfileById=(userId) => async dispach =>{
    
    try {
        const res =await axios.get(`${api}/api/profile/user/${userId}`)


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


// get gihub repos
export const getGitHubReops=(githubUserName) => async dispach =>{
    
    try {
        const res =await axios.get(`${api}/api/profile/github/${githubUserName}`)


    dispach({
            type:GET_REPOS,
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

// add experience

export const addExperience=(formData,history)=>async dispach=>{
    try {
        const config={
            headers:{
                "Content-Type":'application/json'
            }
        }
        const res= await axios.put(`${api}/api/profile/experience`,formData,config)
        dispach({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispach(setAlert('Experience added','success'))
            history.push('/dashboard')
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


// add experience

export const addEducation=(formData,history)=>async dispach=>{
    try {
        const config={
            headers:{
                "Content-Type":'application/json'
            }
        }
        const res= await axios.put(`${api}/api/profile/education`,formData,config)
        dispach({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispach(setAlert('Education added','success'))
            history.push('/dashboard')
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

// delete experience

export const deleteExperience =id =>async dispach=>{
    try {
        const res = await axios.delete(`${api}/api/profile/experience/${id}`)
        dispach({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispach(setAlert('Experience Removed','success'))

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


// delete Education

export const deleteEducation =id =>async dispach=>{
    try {
        const res = await axios.delete(`${api}/api/profile/education/${id}`)
        dispach({
            type:UPDATE_PROFILE,
            payload:res.data
        })
        dispach(setAlert('Education Removed','success'))

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

// delete account adn profile

export const deleteAccount =() =>async dispach=>{

    if(window.confirm('Are You sure? This can not be un done')){
        try {
             await axios.delete(`${api}/api/profile`)
            dispach({
                type:CLEAR_PROFILE,
            })
            dispach({
                type:ACCOUNT_DELETED,
            })
            dispach(setAlert('your account has been permanantly deleted '))
    
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
  
}