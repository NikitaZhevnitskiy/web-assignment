import {combineReducers} from 'redux';
import RegistrationReducer from './RegistrationReducer';
import AuthReducer from './AuthReducer';
import ToDoListReducer from './ToDoListReducer';

export default combineReducers({
    registration: RegistrationReducer,
    auth: AuthReducer,
    todolist: ToDoListReducer
});