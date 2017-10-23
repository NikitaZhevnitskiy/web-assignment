import {
    NO_CONNECTION,
    GET_ITEMS
} from '../actions/todolist/list_types'
const INITIAL_STATE = {
    list:[],
    error: ''
};

export default (state=INITIAL_STATE, action)=>{

    switch(action.type){
        case GET_ITEMS:{
            return { INITIAL_STATE, list: action.payload, error:''}
        }
        case NO_CONNECTION: {
            return { INITIAL_STATE, error:'Server out of service'}
        }


        default:
            return state;
    }
};