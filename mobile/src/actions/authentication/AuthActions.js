import {Actions} from 'react-native-router-flux';

import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED
} from './auth_types'


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

const valid = (dispatch, email, password) => {
    if (email.length >= 5 &&
        email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&
        password.length >= 6)
    {
        return true
    }
    return false
};
