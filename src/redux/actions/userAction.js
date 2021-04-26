import {SET_USER,SET_ERRORS,CLEAR_ERRORS,LOADING_UI,SET_RECOMMENDATION,UNSET_RECOMMENDATION,SET_UNAUTHENTICATED,LOADING_USER, MARK_NOTIFICATION_READ} from '../types'
import axios from 'axios'
export const loginUser = (userData,history)=>(dispatch)=>{
    
    dispatch({type:LOADING_UI})
    axios.post('/login',userData).then(res=>{
        setAuthorizationHandler(res.data.token)
        dispatch(getUserData())
        dispatch({type:CLEAR_ERRORS})
        history.push('/')
    }).catch(err=>{
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    })
}
export const logoutUser =()=>(dispatch)=>{
    localStorage.removeItem('fireToken')
    delete axios.defaults.headers.common['Authorization']
    dispatch({
        type:SET_UNAUTHENTICATED
    })
}

export const getUserData = ()=>(dispatch)=>{
    dispatch({type:LOADING_USER})
    axios.get('/user/details')
    .then(res=>{
        dispatch({
            type:SET_USER,
            payload:res.data
        })
    }).catch(err=>{
        console.log(err)
    } )
}


export const signupUser = (newUserData,history)=>(dispatch)=>{
    
    dispatch({type:LOADING_UI})
    axios.post('/signup',newUserData).then(res=>{
        setAuthorizationHandler(res.data.token)
        dispatch(getUserData())
        dispatch({type:CLEAR_ERRORS})
        history.push('/')
    }).catch(err=>{
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    })
}

export const uploadImage = (formData)=>(dispatch)=>{
    dispatch({type:LOADING_USER})
    axios.post('/user/image',formData)
    .then(res=>{
        dispatch(getUserData())
    }).catch(err=>{
        console.log(err)
    })
}

export const editProfile = (userDetail)=>(dispatch)=>{
    dispatch({type:LOADING_USER})
    axios.post('/user/details',userDetail).then(res=>{
        dispatch(getUserData())
    }).catch(err=>{
        console.log(err)
    })
}

const setAuthorizationHandler = (token)=>{
    const fireToken = `Bearer${' '+token}`
    localStorage.setItem('fireToken',fireToken)
    axios.defaults.headers.common['Authorization'] = fireToken

}

export const markNotificationsRead = (notificationIds)=>dispatch=>{
    axios.post('/notifications',notificationIds).then(res=>{
        dispatch({
            type:MARK_NOTIFICATION_READ
        })
    }).catch(err=>{
        console.log(err)
    })
}
export const setRecommendation = ()=>(dispatch)=>{
    axios.post(`/user/recommendation`,{recommendation:true}).then(res=>{
        dispatch({
            type:SET_RECOMMENDATION,
            payload:true
        
        })
    }).catch(err=>{
        console.log(err)
    })
}
export const unsetRecommendation = ()=>(dispatch)=>{
    axios.post(`/user/recommendation`,{recommendation:false}).then(res=>{
        dispatch({
            type:SET_RECOMMENDATION,
            payload:false
        
        })
    }).catch(err=>{
        console.log(err)
    })
}
export const getRecommendation = ()=>(dispatch)=>{
    axios.get('/user/recommendation').then(res=>{
        dispatch({
            type:SET_RECOMMENDATION,
            payload:res.data.recommendation
        })
    }).catch(err=>{
        console.log(err)
    })}
