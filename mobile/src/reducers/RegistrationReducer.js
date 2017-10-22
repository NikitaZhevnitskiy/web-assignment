import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    REGISTRATION_SUCCESS,
    VALID_EMAIL_PASSWORD,
    NOT_VALID_EMAIL_PASSWORD,
    NO_CONNECTION
} from '../actions/registration/registration_types'

const INITIAL_STATE = {
    email:'',
    password:'',
    error: '',
    loading: false
};

export default (state=INITIAL_STATE, action)=>{

    switch(action.type){
        case EMAIL_CHANGED: {
            return {...state, email: action.payload};
        }
        case PASSWORD_CHANGED: {
            return { ... state, password: action.payload}
        }
        case REGISTRATION_SUCCESS: {
            return { INITIAL_STATE }
        }
        case VALID_EMAIL_PASSWORD: {
            return { ... state, error:''}
        }
        case NOT_VALID_EMAIL_PASSWORD:{
            return { ... state, error:'Email or Password not valid'}
        }
        case NO_CONNECTION: {
            return { INITIAL_STATE, error:'Server out of service'}
        }


        default:
            return state;
    }
};