import {combineReducers} from 'redux';
import RegistrationReducer from './RegistrationReducer';
import AuthReducer from './AuthReducer';
import CreateItemReducer from './CreateItemReducer';
import ListReducer from './ListReducer';

export default combineReducers({
    registration: RegistrationReducer,
    auth: AuthReducer,
    todo_item: CreateItemReducer,
    todo_list: ListReducer
});