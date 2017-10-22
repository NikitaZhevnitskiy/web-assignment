import {Actions} from 'react-native-router-flux';

import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    REGISTRATION_SUCCESS,
    VALID_EMAIL_PASSWORD,
    NOT_VALID_EMAIL_PASSWORD,
    NO_CONNECTION
} from './registration_types'

import {
    URL_API_USERS
} from "../../utils/urls";

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

export const registerNewUser = ({email, password}) => {
    return (dispatch) => {

        // 1 input validation
        if(valid(email,password)){
            dispatch({type:VALID_EMAIL_PASSWORD});
            const user = {email, password};
            // 2 request
            createUser(dispatch,user);
        } else {
            // 5 default
            dispatch({type:NOT_VALID_EMAIL_PASSWORD});
        }

    };

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

const createUser=(dispatch, user)=>{
    fetch(URL_API_USERS, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log(response.status);
            switch(response.status){
                case 201: {
                    // 3 res success
                    dispatch({type: REGISTRATION_SUCCESS});
                    Actions.initialScreen();
                    return
                }
                default:{
                    // 4 res fail
                    dispatch({type: NOT_VALID_EMAIL_PASSWORD});
                    return
                }
            }
        })
        .catch(()=>{
            dispatch({type: NO_CONNECTION})
        })
};

