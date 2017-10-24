import {
    NO_CONNECTION,
    GET_ITEMS,
    KEY_WORD_CHANGED
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
            return { ... state, list: action.payload.items, filtered:action.payload.filtered, error:''}
        }
        case NO_CONNECTION: {
            return { INITIAL_STATE, error:'Server out of service'}
        }
        case KEY_WORD_CHANGED: {
            return { ... state, keyword:action.payload.keyword, filtered:action.payload.filtered }
        }
        default:
            return state;
    }
};