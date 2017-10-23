import {
    TITLE_CHANGED,
    DESCRIPTION_CHANGED,
    VALID_TITLE_DESCRIPTION,
    NOT_VALID_TITLE_DESCRIPTION,
    ITEM_CREATED,
    NO_CONNECTION
} from '../actions/todolist/list_types'
const INITIAL_STATE = {
    title:'',
    description:'',
    error: ''
};

export default (state=INITIAL_STATE, action)=>{

    switch(action.type){
        case TITLE_CHANGED: {
            return {...state, title: action.payload};
        }
        case DESCRIPTION_CHANGED: {
            return { ... state, description: action.payload}
        }
        case ITEM_CREATED: {
            return { INITIAL_STATE }
        }
        case VALID_TITLE_DESCRIPTION: {
            return { ... state, error:''}
        }
        case NOT_VALID_TITLE_DESCRIPTION:{
            return { ... state, error:'Title or Description not valid'}
        }
        case NO_CONNECTION: {
            return { INITIAL_STATE, error:'Server out of service'}
        }
        default:
            return state;
    }
};