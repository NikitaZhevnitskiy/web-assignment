
import {
    NO_CONNECTION,
    GET_ITEMS,
    FILTERING
} from './list_types'

import {
    URL_API_USER_LIST
} from '../../utils/urls';

export const filtering = (keyword,items) => {
    // double validation for safety

    if(keyword === '' || keyword === 'undefined'){
        return {
            type: FILTERING,
            payload: {filtered:items,keyword}
        }
    }
    //     // filtering
    //     const filtered = items.filter((item)=>{
    //         return item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1
    //     });
    //
    //     console.log(filtered);
    //
    return {
        type: FILTERING,
        payload: {filtered:[],keyword}
    }


};

export const getItems = (token) => {
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
            if(json.todolist){
                var arr = json.todolist;
                dispatch({type:GET_ITEMS, payload:arr})
            } else {
                dispatch({type:GET_ITEMS, payload:[]})
            }
        }).catch(()=>{
                dispatch({type: NO_CONNECTION})
            })



        // dispatch({type:GET_ITEMS, payload: [{title:"hei man",description:"super description", _id:"43wdferdfgd"}]})
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