import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
// COMPONENTS
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';

//Stabs
const Registration = () => <div>Registration</div>;

class App extends Component {
    render() {
        return(

            <BrowserRouter>
                <div className="container">
                    <Header/>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/signup" component={Signup}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
