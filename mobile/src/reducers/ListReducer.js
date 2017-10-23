import {
    NO_CONNECTION,
    GET_ITEMS,
    FILTERING
} from '../actions/todolist/list_types'
const INITIAL_STATE = {
    list:[],
    filtered:[],
    error: '',
    keyword:'',

};

export default (state=INITIAL_STATE, action)=>{

    switch(action.type){
        case GET_ITEMS:{
            return { INITIAL_STATE, list: action.payload, error:''}
        }
        case NO_CONNECTION: {
            return { INITIAL_STATE, error:'Server out of service'}
        }
        case FILTERING: {
            return { ...state, keyword:action.payload.keyword, filtered:action.payload.filtered }
        }

        default:
            return state;
    }
};