import {Actions} from 'react-native-router-flux';

import {
    EMAIL_CHANGED,
    LOGIN_SUCCESS,
    PASSWORD_CHANGED,
    NOT_VALID_EMAIL_PASSWORD,
    NO_CONNECTION
} from './auth_types'

import {
    URL_API_LOGIN
} from '../../utils/urls'

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
};

export const loginUser = ({email, password}) => {
    return (dispatch) => {
        // 1 validation
        if(valid(email,password)){
            // 2 request
            const user = {email,password};
            login(dispatch,user);
        }
        // not valid
        else {
            dispatch({type: NOT_VALID_EMAIL_PASSWORD})
        }
    }
};

const valid = (email, password) => {
    if (email.length >= 5 &&
        email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&
        password.length >= 6)
    {
        return true
    }
    return false
};


const login = (dispatch, user) => {
    // 2 request

    fetch(URL_API_LOGIN, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            switch(response.status){
                case 200:{
                    console.log("All ok 200")
                    return response.json()
                }
                default:{
                    console.log("goes wrong "+response.status);
                    return {}
                }
            }
        })
        .then(json => {
            // 3 request success -> get token
            if(json.token){
                loginSuccess(dispatch, json.token)
            }
            // 4 request not success
            else {
                loginFailed(dispatch)
            }
        })
        // 5 request fail
        .catch(()=>{
            dispatch({type: NO_CONNECTION})
        });
};


const loginSuccess=(dispatch,token)=>{
    dispatch({
        type: LOGIN_SUCCESS,
        payload: token
    });
    Actions.todo();
};

const loginFailed = (dispatch) =>{
    dispatch({
        type: NOT_VALID_EMAIL_PASSWORD
    })
};


