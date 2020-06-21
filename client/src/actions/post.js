import axios from 'axios'
import {setAlert} from './alert'
import {GET_POSTS,POST_ERROR, UPDATE_LIKES, DELETE_POST,ADD_POST,GET_POST, ADD_COMMENT, REMOVE_COMMENT} from './types'
import {api} from '../serviceUrl'

// Get Posts 

export const getPosts=()=> async dispach=>{
try {
    const res =await axios.get(`${api}/api/posts`)
    dispach({
        type:GET_POSTS,
        payload:res.data
    })
} catch (error) {
    dispach({
        type:POST_ERROR,
        payload:{
            msg:error.response&&error.response.statusText,
            status:error.response&&error.response.status
        }
    })
}
}

//add like

export const addLike=(postId)=> async dispach=>{
    try {
        const res =await axios.put(`${api}/api/posts/like/${postId}`)
        dispach({
            type:UPDATE_LIKES,
            payload:{
                postId,
                likes:res.data
            }
        })
    } catch (error) {
        dispach({
            type:POST_ERROR,
            payload:{
                msg:error.response&&error.response.statusText,
                status:error.response&&error.response.status
            }
        })
    }
    }


    //remove like

export const removeLike=(postId)=> async dispach=>{
    try {
        const res =await axios.put(`${api}/api/posts/unlike/${postId}`)
        dispach({
            type:UPDATE_LIKES,
            payload:{
                postId,
                likes:res.data
            }
        })
    } catch (error) {
        dispach({
            type:POST_ERROR,
            payload:{
                msg:error.response&&error.response.statusText,
                status:error.response&&error.response.status
            }
        })
    }
    }

    
    //delete post

export const deletePost=(postId)=> async dispach=>{
    try {
        await axios.delete(`${api}/api/posts/${postId}`)
        dispach({
            type:DELETE_POST,
            payload:{
                postId,
            }
        })
        dispach(setAlert('Post removed','success'))
    } catch (error) {
        dispach({
            type:POST_ERROR,
            payload:{
                msg:error.response&&error.response.statusText,
                status:error.response&&error.response.status
            }
        })
    }
    }

    
    //add post

export const addPost=(formData)=> async dispach=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res =await axios.post(`${api}/api/posts`,formData,config)
        dispach({
            type:ADD_POST,
            payload:res.data
        })
        dispach(setAlert('Post Created','success'))
    } catch (error) {
        dispach({
            type:POST_ERROR,
            payload:{
                msg:error.response&&error.response.statusText,
                status:error.response&&error.response.status
            }
        })
    }
    }



    // Get Post

export const getPost=(postId)=> async dispach=>{
    try {
        const res =await axios.get(`${api}/api/posts/${postId}`)
        dispach({
            type:GET_POST,
            payload:res.data
        })
    } catch (error) {
        dispach({
            type:POST_ERROR,
            payload:{
                msg:error.response&&error.response.statusText,
                status:error.response&&error.response.status
            }
        })
    }
    }



    //add comment

    export const addComment=(postId,formData)=> async dispach=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res =await axios.post(`${api}/api/posts/comment/${postId}`,formData,config)
            dispach({
                type:ADD_COMMENT,
                payload:res.data
            })
            dispach(setAlert('Comment Added','success'))
        } catch (error) {
            dispach({
                type:POST_ERROR,
                payload:{
                    msg:error.response&&error.response.statusText,
                    status:error.response&&error.response.status
                }
            })
        }
        }    



        
    //delete comment

    export const removeComment=(postId,commentId)=> async dispach=>{
        
        try {
            await axios.delete(`${api}/api/posts/comment/${postId}/${commentId}`)
            dispach({
                type:REMOVE_COMMENT,
                payload:commentId
            })
            dispach(setAlert('Comment Removed','success'))
        } catch (error) {
            dispach({
                type:POST_ERROR,
                payload:{
                    msg:error.response&&error.response.statusText,
                    status:error.response&&error.response.status
                }
            })
        }
        }    