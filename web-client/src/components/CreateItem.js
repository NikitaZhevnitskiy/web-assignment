import React, {Component} from 'react'
import {URL_API_USER_LIST} from "../utils/RoutesApi";
import {getTokenFromStorage} from "../utils/AuthService";

class CreateItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: ''
        }
    }

    createItem(e) {
        e.preventDefault();
        console.log("prevent default")
        // fetch(URL_API_USER_LIST, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization': `${getTokenFromStorage()}`
        //
        //     },
        //     body: JSON.stringify(this.state)
        // })
        //     .then(response => response.json())
    }

    render() {
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
                             onChange={e => this.setState({title: e.target.value})}
                         />
                     </div>
                     <div className="form-group">
                         <textarea
                             className="form-control"
                             id="username-input"
                             type="text"
                             placeholder="Description"
                             onChange={e => this.setState({description: e.target.value})}
                         />
                     </div>
                     <button className="btn btn-primary btn-block">
                         Create
                     </button>
                 </form>
             </div>
         )
     }
};
export default CreateItem