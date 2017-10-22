import {combineReducers} from 'redux';
import RegistrationReducer from './RegistrationReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
    registration: RegistrationReducer,
    auth: AuthReducer
});