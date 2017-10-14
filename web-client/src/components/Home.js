import React, {Component} from 'react';
import {getTokenFromStorage, isLogged} from "../utils/AuthService";


class Home extends Component {

    componentDidMount(){
        this.setState({loggedIn:isLogged()})
    }

    constructor(props){
        super(props);
        this.state = {
            loggedIn:false
        };
    }
    render() {

        if (this.state.loggedIn) {
            return (
                <div>
                    User in system
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className="jumbotron">
                        <h1>Welcome to ToDo list application</h1>
                        {console.log(getTokenFromStorage())}
                        <p>Login || Register please</p>
                    </div>
                </div>
            )
        }
    }
}
export default Home