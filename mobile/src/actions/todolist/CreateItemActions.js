import {Actions} from 'react-native-router-flux';

import {
    TITLE_CHANGED,
    DESCRIPTION_CHANGED,
    VALID_TITLE_DESCRIPTION,
    NOT_VALID_TITLE_DESCRIPTION,
    ITEM_CREATED,
    NO_CONNECTION,
} from './list_types'

import {
    URL_API_USER_LIST
} from '../../utils/urls';




export const titleChanged = (text) => {
    return {
        type: TITLE_CHANGED,
        payload: text
    }
};

export const descriptionChanged = (text) => {
    return {
        type: DESCRIPTION_CHANGED,
        payload: text
    }
};

export const createItem = (title, description, token) => {
    return (dispatch) => {

        // 1 input validation
        if(valid(title,description)){
            dispatch({type:VALID_TITLE_DESCRIPTION});
            const item = {title, description};
            // 2 request
            newItem(dispatch,item,token);
        } else {
            // 5 default
            dispatch({type:NOT_VALID_TITLE_DESCRIPTION});
        }

    };

};

const valid = (title, description) => {
    //validate for undefined
    if (title && description){
        //rest validation
        if (
            title.length >= 1 &&
            description.length >= 1) {
            return true
        }
    }

    return false
};

const newItem=(dispatch, item, token)=>{
    fetch(URL_API_USER_LIST, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(item)
    }).then(res => {
        switch(res.status){
            case 201: {
                dispatch({type:ITEM_CREATED});
                Actions.list();
                return
            }
            default: {
                dispatch({type:NO_CONNECTION});
                return
            }
        }
    })
};


