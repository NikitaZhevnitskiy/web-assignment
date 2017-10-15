import React, {Component} from 'react';
import TodoContainer from '../todolist/TodoContainer'
import {isLogged, getUserInSystem} from "../../utils/AuthService";


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
                    <div className="panel panel-default">
                        <div className="panel-heading">User in system:</div>
                        <div className="panel-body">{this.state.userInSystem}</div>
                    </div>
                    <TodoContainer />
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