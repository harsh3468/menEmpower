import {SET_SCREAMS,FILTER_SCREAMS,SET_SCREAM,UNLIKE_SCREAM,LIKE_SCREAM,LOADING_DATA, DELETE_SCREAM,POST_SCREAM, SUBMIT_COMMENT, SET_TAGS} from '../types'
import { act } from '@testing-library/react'

const initialState = {
    screams:[],
    filterScreams:[],
    scream:{},
    tags:[],
    loading:false
}

export default function(state=initialState,actions){
    switch(actions.type){
        case LOADING_DATA:
            return {
                ...state,
                loading:true
            }
        
        case SET_SCREAMS:
            return {
                ...state,
                screams:actions.payload,
                loading:false
            }
        case FILTER_SCREAMS:
                return {
                    ...state,
                    filterScreams:actions.payload,
                    loading:false
                }
        case SET_TAGS:
                    return {
                        ...state,
                        tags:actions.payload,
                    }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:   
            var index = state.screams.findIndex((scream)=>scream.screamId === actions.payload.screamId)
                state.screams[index] = actions.payload
                if (state.scream.screamId === actions.payload.screamId) {
                    let hold = state.scream.comments
                    state.scream = actions.payload;
                    state.scream.comments = hold
                  }            
                return {...state}
        case DELETE_SCREAM:
             index = state.screams.findIndex(scream=>scream.screamId === actions.payload)
            state.screams.splice(index,1)
            return{
                ...state
            }
        case POST_SCREAM:
            return{
                ...state,
                screams:[
                    actions.payload,
                    ...state.screams
                ],
                filterScreams:[
                    actions.payload,
                    ...state.screams
                ]
            }
        case SET_SCREAM:
            return{
                ...state,
                scream:actions.payload
            }
        case SUBMIT_COMMENT:
            return{
                ...state,
                scream:{
                    ...state.scream,
                    commentCount:state.scream.commentCount +1 
                    ,
                    comments:[actions.payload,...state.scream.comments]
                }

            }
        case SET_TAGS:
            return{...state,tags:actions.payload}
        default:
            return state
            
    }
}