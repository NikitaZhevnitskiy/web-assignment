import {Redirect} from 'react-router-dom'
import history from '../history'
const TOKEN = 'token';

export function setToken(token){
    localStorage.setItem(TOKEN,token)
    // console.log(localStorage.getItem('token'))
}

export function logout() {
    // console.log(localStorage.getItem('token'))
    localStorage.removeItem(TOKEN)
    history.push('/')
    // console.log(localStorage.getItem('token'))
}

export function getTokenFromStorage() {
    // console.log(localStorage.getItem(TOKEN));
    return localStorage.getItem(TOKEN)
}

export function isLogged() {
    const token = getTokenFromStorage();
    if(token)
        return true
    else
        return false
}



