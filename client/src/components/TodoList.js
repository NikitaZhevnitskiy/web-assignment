// import React, {Component} from 'react'
// // API routes
// import {
//     URL_LISTS
// } from '../util/api'
//
// class TodoList extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             items: [],
//             filtered: [],
//             keyword: ''
//         }
//     }
//
//     componentDidMount() {
//         this.getItems()
//     }
//
//     render() {
//         return (
//             <div className="list_component">
//                 <div className="list_input">
//                     <input
//                         value={this.state.keyword}
//                         type="text"
//                         placeholder="Search for a title"
//                         onChange={e=>this.searchItem(e)}
//                     />
//                 </div>
//
//                 <div className="list_items">
//                     {this.renderItems(this.state)}
//                 </div>
//             </div>
//         )
//     }
//
//     getItems(){
//         fetch(URL_LISTS, {
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         })
//             .then(response => response.json())
//             .then(json => {
//                 console.log(json)// debug
//                 this.setState({
//                     items: json,
//                     filtered: json,
//                     keyword:''
//                 })
//             })
//     }
//
//     renderItems = ({filtered}) => {
//         return filtered.map((item) => {
//             return (
//                 <div className="list_item" key={item._id}>
//                     <div>
//                         <h4 className="list-group-item-heading">{item.title}</h4>
//                         <p className="list-group-item-text">{item.description}</p>
//                     </div>
//
//                     <button className="btn btn-danger" onClick={(e)=> {
//                         // e.preventDefault();
//                         fetch(`${URL_LISTS}/${item._id}`, {method: 'DELETE'})
//                             .then(()=>this.getItems())}}
//                     >
//                         Delete
//                     </button>
//                 </div>
//             )
//         })
//     }
//
//     searchItem = (event) => {
//         const keyword = event.target.value
//         if(keyword !== ''){
//             const list = this.state.items.filter((item)=>{
//                 return item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1
//             })
//             this.setState({
//                 filtered: list,
//                 keyword
//             })
//         }else {
//             this.setState({
//                 filtered:this.state.items,
//                 keyword
//             })
//         }
//     }
// }
// export default TodoList
