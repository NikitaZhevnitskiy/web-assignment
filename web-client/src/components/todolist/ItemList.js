import React,{Component} from 'react';
import {getTokenFromStorage} from "../../utils/AuthService";
import {URL_API_USER_LIST} from '../../utils/RoutesApi'

class ItemList extends Component{

    constructor(props){
        super(props)
        this.state={
            items:[],
            filtered:[],
            keyword: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.props.items) {
            this.setState({ items: nextProps.items, filtered:nextProps.items });
        }
    }
    renderItems = () => {
        const filtered = this.state.filtered;
        return filtered.map((item) => {
            return (
                <div className="list_item" key={item._id}>
                    <div>
                        <h4 className="list-group-item-heading">{item.title}</h4>
                        <p className="list-group-item-text">{item.description}</p>
                    </div>
                    <button className="btn btn-danger"
                            onClick={(e)=> {
                                // e.preventDefault();
                                fetch(`${URL_API_USER_LIST}/${item._id}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization': `${getTokenFromStorage()}`
                                    }
                                })
                                .then(()=>this.getItems())
                            }}

                    >
                        Delete
                    </button>
                </div>
            )
        })
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
            console.log(arr);
            this.setState({
                items: arr,
                filtered:arr,
                keyword:''
            })
        })
    }


    render(){
        return(
            <div className="list_component">

                {console.log(this.props)}
                {console.log(this.state)}

                {/*Search feature*/}
                <div className="list_input">
                    <input
                        value={this.state.keyword}
                        type="text"
                        placeholder="Search for a title"
                        onChange={e=>this.searchItem(e)}
                    />
                </div>

                {/*LIST with items*/}
                <div className="list_items">
                    {this.renderItems()}
                </div>

            </div>
        )
    }

    searchItem = (event) => {
        const keyword = event.target.value
        if(keyword !== ''){
            const list = this.state.items.filter((item)=>{
                return item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1
            })
            this.setState({
                filtered: list,
                keyword
            })
        }else {
            this.setState({
                filtered:this.state.items,
                keyword
            })
        }
    }

}
export default ItemList