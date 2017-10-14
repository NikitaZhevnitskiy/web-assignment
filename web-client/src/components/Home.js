import React, {Component} from 'react';
import {isLogged, getUserInSystem} from "../utils/AuthService";


class Home extends Component {

    componentDidMount(){
        if(isLogged()){
            this.setState({loggedIn:isLogged()})
            getUserInSystem((email)=>{this.setState({userInSystem:email})})
        } else {
            this.setState({loggedIn:isLogged()})
        }
    }

    constructor(props){
        super(props);
        this.state = {
            loggedIn:false,
            userInSystem:''
        };
    }



    render() {
        if (this.state.loggedIn) {
            return (
                <div>
                    User in system: {this.state.userInSystem}
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className="jumbotron">
                        <h1>Welcome to ToDo list application</h1>
                        {/*{console.log(getTokenFromStorage())}*/}
                        <p>Login || Register please</p>
                    </div>
                </div>
            )
        }
    }
}
export default Home