// import React, {Component} from 'react'
// import {URL_LISTS} from '../util/api'
//
// class CreateItem extends Component {
//     constructor() {
//         super()
//
//         this.state = {
//             title: '',
//             description: ''
//         }
//     }
//
//     createItem() {
//         fetch(URL_LISTS, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(this.state)
//         })
//             .then(response => response.json())
//     }
//
//     render() {
//         return (
//             <div className="container">
//                 <form onSubmit={() => {this.createItem()}}>
//                     <h1>New Item</h1>
//                     <div className="form-group">
//                         <input
//                             className="form-control"
//                             id="username-input"
//                             type="text"
//                             placeholder="Title"
//                             onChange={e => this.setState({title: e.target.value})}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <textarea
//                             className="form-control"
//                             id="username-input"
//                             type="text"
//                             placeholder="Description"
//                             onChange={e => this.setState({description: e.target.value})}
//                         />
//                     </div>
//                     <button className="btn btn-primary btn-block">
//                         Create
//                     </button>
//                 </form>
//             </div>
//         )
//     }
// }
// export default CreateItem