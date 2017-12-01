import React,{Component} from 'react';
import {getTokenFromStorage} from "../../utils/AuthService";
import {URL_API_USER_LIST, SOCKET_API_BASE} from "../../utils/RoutesApi";

class ItemList extends Component{

    constructor(props){
        super(props);
        this.state={
            userInSystem:"",
            items:[],
            filtered:[],
            keyword: '',

            ws: null,
            draft: '',
            publicItems:[]
        }
    }

    componentWillMount() {
        // api url
        const url = SOCKET_API_BASE;
        // const url = 'ws://localhost:3000';
        const ws = new WebSocket(url);

        this.setState({ ws: ws });

        ws.onopen = () => {
            console.log('ItemList Connected!');
        };

        ws.onmessage = message => {
            try {
                let item = this.parseMessage(message.data);
                console.log(item);
                if(item.publicState){
                    let showState = item.publicState;
                    //add
                    if(showState.trim() === "true"){
                        this.setState({
                            publicItems: [...this.state.publicItems, item],
                        });
                    }
                    //remove
                    else {
                        let arr = this.state.publicItems.filter(i => i.id !== item.id);
                        this.setState({ publicItems: arr });
                    }
                }
            }catch (err){}

        };
    }


    // Special type of messages
    /**
     * (<user>):{ _id, title, description, public_state }
     * (a@a.com):{5a1822fd9bce790abe809a8d, dasd, adfdsf, true}
     *
     * will construct publicItem(entity for internal usage):
     {
        "userName":"a@a.com",
        "id": "5a1822fd9bce790abe809a8d",
        "title": "dasd",
        "description": "adfdsf",
        "publicState": true
     }
     *

     *
     * */
    parseMessage(messageText){
        if(messageText.endsWith("}") && messageText.includes("{")){
            // get data
            let array = messageText.split(":");

            // get usr name
            let lengthArr = array[0].trim().length - 2;
            let userName = array[0].substr(1,lengthArr);

            // get item
            let itemPropsLength = array[1].trim().length-2;
            let itemPropsString = array[1].trim().substr(1,itemPropsLength);
            let itemProperties = itemPropsString.split(",");
            const item = {
                id: itemProperties[0],
                title: itemProperties[1],
                description: itemProperties[2],
                publicState: itemProperties[3]
            };
            return item
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.props.items) {
            this.setState({ items: nextProps.items, filtered:nextProps.items });
        }
    }

    renderMyItems = () => {
        const filtered = this.state.filtered;
        return filtered.map((item) => {
            return (
                <div className="list_item" key={item._id}>
                    <div>
                        <h4 className="list-group-item-heading">{item.title}</h4>
                        <p className="list-group-item-text">{item.description}</p>
                    </div>
                    {this.renderMarker(item)}


                    <button className="btn btn-danger"
                            onClick={(e)=> {
                                // e.preventDefault();
                                fetch(`${URL_API_USER_LIST}/${item._id}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization': `${getTokenFromStorage()}`
                                    }})
                                    .then(()=>this.getItems())
                            }}
                    >
                        Delete
                    </button>

                </div>
            )
        })
    };

    renderMarker(item){
        if(item.public){
            return(
                <div>
                    {this.getMarkerButton("Make public!",item)}
                </div>
            )
        }else {
            return(
                <div>
                    {this.getMarkerButton("Make private!",item)}
                </div>
            )
        }
    }

    getMarkerButton(buttonName, item) {
        let bodyStatus = {state: `${!item.public}`};

        // styling
        var makePrivate="btn-success ";
        var makePublic="btn-warning";
        var additional = "btn-info";

        if(item.public){
            additional=makePrivate
        }
        else{
            additional=makePublic
        }

        var styleClass = `btn btn-left ${additional}`
        return(
            <div key={item._id}>
                {/*<button className="btn .btn-warning btn-left"*/}
                <button className={styleClass}
                        onClick={(e)=> {
                            // e.preventDefault();
                            fetch(`${URL_API_USER_LIST}/${item._id}`, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': `${getTokenFromStorage()}`
                                },
                                body: JSON.stringify(bodyStatus)

                            })
                                .then(()=>this.getItems())
                                .then(()=>{
                                    this.state.ws.send(`(ignore):{${item._id.toString().trim()},${item.title},${item.description},${item.public.toString().trim()} }`);
                                })
                        }}
                >
                    {buttonName}
                </button>
            </div>
        )
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

                <div className="list_items">
                    <h2>Public items</h2>
                    {this.renderPublicItems()}
                </div>
                <br />

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
                    <h2>My items</h2>
                    {this.renderMyItems()}
                </div>

            </div>
        )
    }

    searchItem = (event) => {
        const keyword = event.target.value
        if(keyword !== ''){
            const list = this.state.items.filter((item)=>{
                return item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1
            });
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
    };

    renderPublicItems(){
        const publicItems = this.state.publicItems;
        return publicItems.map((item) => {
            return (
                <div className="list_item" key={item.id}>
                    <div>
                        <h3>{item.userName}</h3>
                        <h4 className="list-group-item-heading">{item.title}</h4>
                        <p className="list-group-item-text">{item.description}</p>
                    </div>
                </div>
            )
        })

    }

}
export default ItemList