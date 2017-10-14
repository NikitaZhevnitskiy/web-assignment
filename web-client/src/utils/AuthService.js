import {Redirect} from 'react-router-dom'
import history from '../history'
import {URL_API_LOGGED_USER} from "./RoutesApi";

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

export function getUserInSystem(cb) {
    const token = getTokenFromStorage();
    // console.log(token)
    fetch(URL_API_LOGGED_USER,{
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':`${token}`
        }
    })
        .then(response => {
            switch(response.status){
                case 401:{
                    console.log('No token or Bad token 401')
                    return {}
                }
                case 200: {
                    console.log('All ok 200')
                    return response.json()
                }
            }
        })
        .then(json => {
            console.log(json)
            cb(json.email)
        })
}



