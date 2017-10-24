
import {
    NO_CONNECTION,
    GET_ITEMS,
    KEY_WORD_CHANGED
} from './list_types'

import {
    URL_API_USER_LIST
} from '../../utils/urls';

export const keyWordChange = (keyword,items) => {
    // console.log("ACTIONS keyword___________");
    // console.log(keyword);
    // console.log("ACTIONS items BEFORE filtrating___________");
    // items.map(i=>console.log(i));

    const filtered= searchItems(keyword,items);

    // console.log("ACTIONS filtered ___________");
    // filtered.map(i=>console.log(i));

    return {
        type: KEY_WORD_CHANGED,
        payload: {keyword, filtered}
    }
};

const searchItems = (key,items) => {
    if(key !== '' || key !== 'undefined') {
        return items.filter((item) => {
            return item.title.toLowerCase().indexOf(key.toLowerCase()) > -1
        });
    }
    return items
};


export const getItems = (token, keyword) => {
    console.log("keyword in action ->"+keyword+".");
    return (dispatch) => {
        fetch(URL_API_USER_LIST, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(res=>{
            switch(res.status){
                case 200:{
                    console.log("All ok 200");
                    return res.json()
                }
                default: {
                    console.log("Default case");
                    return {}
                }
            }
        }).then(json => {

            if(json.todolist) {
                var items = json.todolist;
                var filtered = keyword==='' ? items: searchItems(keyword,items);
                // dancing
                dispatch({type: GET_ITEMS, payload:{items,filtered}})
            }
        }).catch(()=>{
                dispatch({type: NO_CONNECTION})
        })
    };

};



export const deleteItem = (token, itemId) => {
    return (dispatch) => {
        fetch(`${URL_API_USER_LIST}/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).catch(()=>{
            dispatch({type: NO_CONNECTION})
        })
    };
};