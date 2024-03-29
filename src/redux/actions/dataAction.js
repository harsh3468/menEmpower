import {SET_SCREAMS,SET_SCREAM,FILTER_SCREAMS,SET_TAGS,STOP_LOADING_UI,LOADING_DATA,LIKE_SCREAM,UNLIKE_SCREAM,DELETE_SCREAM, SET_ERRORS,CLEAR_ERRORS,LOADING_UI,POST_SCREAM, SUBMIT_COMMENT} from '../types'
import axios from 'axios'
import { storage } from '../../firebase/firebase';

export const getScreams = ()=>(dispatch)=>{
    dispatch({type:LOADING_DATA})
    axios.get('/getScreams').then(res=>{
        dispatch({
            type:SET_SCREAMS,
            payload:res.data
        })
        dispatch({
            type:FILTER_SCREAMS,
            payload:res.data
        })
    }).catch(err=>{
        dispatch({
            type:SET_SCREAMS,
            payload:[]
        })
    })
}
export const getScream = (screamId)=>(dispatch)=>{
    dispatch({type:LOADING_UI})
    axios.get(`/screams/${screamId}`).then(res=>{
        dispatch({type:SET_SCREAM,payload:res.data})
        dispatch({type:STOP_LOADING_UI})
    }).catch(err=>{
        console.log(err)
    })
}
export const likeScream = (screamId)=>(dispatch)=>{
    axios.get(`/screams/${screamId}/like`).then(res=>{
        dispatch({
            type:LIKE_SCREAM,
            payload:res.data
        
        })
    }).catch(err=>{
        console.log(err)
    })
}



export const unlikeScream = (screamId)=>(dispatch)=>{
    axios.get(`/screams/${screamId}/unlike`).then(res=>{
        dispatch({
            type:UNLIKE_SCREAM,
            payload:res.data
        
        })
    }).catch(err=>{
        console.log(err)
    })
}

export const deleteScream = (screamId)=>(dispatch)=>{
    axios.delete(`/screams/${screamId}/delete`).then(res=>{
        dispatch({type:DELETE_SCREAM,payload:screamId})
    }).catch(err=>{
        console.log(err)
    })
}

export const postScream = (newScream)=>(dispatch)=>{
    dispatch({type:LOADING_UI})
    axios.post('/postData',newScream).then(res=>{
        dispatch({type:POST_SCREAM,payload:res.data})
        dispatch({
            type:CLEAR_ERRORS
        })
    }).catch(err=>{
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    })
}

export const clearErrors =()=>dispatch=>{
    dispatch({type:CLEAR_ERRORS})
}

export const submitComment = (screamId,commentData)=>(dispatch)=>{
  axios.post(`/screams/${screamId}/comment`,commentData).then(res=>{
      dispatch({
          type:SUBMIT_COMMENT,
          payload:res.data
      })
      dispatch(clearErrors())
    })
      .catch(err=>{
          console.log(err)
          dispatch({
              type:SET_ERRORS,
              payload:err.response.data
          })
      })  
}
export const getUserData = (userHandle)=>dispatch=>{
    dispatch({type:LOADING_DATA})
    axios.get(`/user/${userHandle}`).then(res=>{
        dispatch({
            type:SET_SCREAMS,
            payload:res.data.screams      
        })
    }).catch(err=>{
        console.log(err)
        dispatch({
            type:SET_SCREAMS,
            payload:null
        })
    })
}
export const getTags = ()=>dispatch=>{
    dispatch({type:LOADING_DATA})
    axios.get(`/scream/tags`).then(res=>{
        dispatch({
            type:SET_TAGS,
            payload:res.data.tags      
        })
    }).catch(err=>{
        console.log(err)
        dispatch({
            type:SET_TAGS,
            payload:null
        })
    })
}
export const uploadFile=(fileUpload,callback)=>(dispatch)=>{
    const ref = storage().ref();
    const file = fileUpload
    const name = (+new Date()) + '-' + file.name;
    const metadata = {
    contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then((url) => {
    callback(url)
    console.log(url);
  })
  .catch(console.error);
}

export const screamImage = (formData,callback)=>(dispatch)=>{
    axios.post('/scream/image',formData)
    .then(res=>{
        return callback(res.data.message)
    }).catch(err=>{
        console.log(err)
    })
    
}

