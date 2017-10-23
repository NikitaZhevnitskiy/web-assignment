import {combineReducers} from 'redux';
import RegistrationReducer from './RegistrationReducer';
import AuthReducer from './AuthReducer';
import ToDoListReducer from './CreateItemReducer';

export default combineReducers({
    registration: RegistrationReducer,
    auth: AuthReducer,
    todolist: ToDoListReducer
});