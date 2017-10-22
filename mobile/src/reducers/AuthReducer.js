import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    VALID_EMAIL_PASSWORD,
    NOT_VALID_EMAIL_PASSWORD,
    LOGIN_SUCCESS
} from '../actions/authentication/auth_types'

const INITIAL_STATE = {
    email:'',
    password:'',
    error: '',
    loading: false,
};

export default (state=INITIAL_STATE, action)=>{
    // main debug
    console.log(action);

    switch(action.type){
        case EMAIL_CHANGED: {
            return {...state, email: action.payload};
        }
        case PASSWORD_CHANGED: {
            return { ... state, password: action.payload}
        }
        case VALID_EMAIL_PASSWORD: {
            return { ... state, error:''}
        }
        case NOT_VALID_EMAIL_PASSWORD:{
            return { ... state, error:'Email or Password not valid'}
        }
        case LOGIN_SUCCESS: {
            return { INITIAL_STATE }
        }

        default:
            return state;
    }
};