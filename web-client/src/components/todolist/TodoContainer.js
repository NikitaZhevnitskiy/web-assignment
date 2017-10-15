import React, {Component} from 'react'
import {URL_API_USER_LIST} from "../../utils/RoutesApi";
import {getTokenFromStorage} from "../../utils/AuthService";
import ItemList from "./ItemList";

class TodoContainer extends Component{


    constructor(props){
        super(props);
        this.state={
            // items
            items:[],
            // createForm
            title: '',
            description: ''
        }
    }


    componentDidMount() {
        this.getItems()
    }

    isEnabled(){
        if(this.state.title.length >0 && this.state.description.length>0){
            return true
        }
        return false
    }

    getItems(){
        fetch(URL_API_USER_LIST, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${getTokenFromStorage()}`
            }
        }).then(res=>{
            switch(res.status){
                case 401: {
                    console.log("Not authorized 401")
                    return {}
                }
                case 404: {
                    console.log("Not found 404")
                    return {}
                }
                case 200:{
                    console.log("All ok 200")
                    return res.json()
                }
                default: {
                    console.log("Default case")
                    return {}
                }
            }
        }).then(json => {
            var arr = json.todolist
            // console.log(arr);
            this.setState({
                items: arr
            })
        })
    }

    renderCreateForm(){
        return (
            <div className="container search_block">
                <form onSubmit={(e) => {this.createItem(e)}}>
                    <h1>New Item</h1>
                    <div className="form-group">
                        <input
                            className="form-control"
                            id="username-input"
                            type="text"
                            placeholder="Title"
                            ref='title_field'
                            onChange={e => this.setState({title: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                         <textarea
                             className="form-control"
                             id="username-input"
                             type="text"
                             placeholder="Description"
                             ref='description_field'
                             onChange={e => this.setState({description: e.target.value})}
                         />
                    </div>
                    <button
                        className="btn btn-primary btn-block"
                        disabled={!this.isEnabled()}>
                        Create
                    </button>
                </form>
            </div>
        )
    }

    createItem(e) {
        e.preventDefault();
        //validation
        const title = this.state.title
        const description = this.state.description
        if(title.length<1 || description.length<1){
            console.log("input not valid")
            return
        }
        const item = {title:this.state.title,description:this.state.description};
        fetch(URL_API_USER_LIST, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${getTokenFromStorage()}`

            },
            body: JSON.stringify(item)
        }).then(res => {
            switch(res.status){
                case 404: {
                    console.log("smth wrong 404")
                    return {}
                }
                case 401: {
                    console.log("unautorized 401")
                    return {}
                }
                default: {
                    console.log("default 200")
                    return res.json()
                }
            }
        }).then(json => {
            //clear fields
            this.refs.title_field.value=''
            this.refs.description_field.value=''
            //new state
            this.setState({title:'',description:'',items:json.todolist});
        })
    }

    render(){
        return(
            <div>
                {this.renderCreateForm()}
                <ItemList items={this.state.items} />
            </div>
        )

    }
}
export default TodoContainer