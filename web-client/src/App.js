import React, { Component } from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import history from './history'
// COMPONENTS
import Header from './components/common/Header';
import Login from './components/registration/Login';
import Signup from './components/registration/Signup';
import Home from './components/common/Home'
//Stabs
const NoMatch = () => <div>Page not found</div>;


class App extends Component {
    render() {
        return(

            <Router history={history}>
                <div className="container">
                    <Header/>
                    <div className="container-fluid">
                        <Switch>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/signup" component={Signup}/>

                            <Route exact path="/home" component={Home}/>
                            <Route exact path="/" render={() => (<Redirect to="/home" />)} />
                            <Route path="*" component={NoMatch} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;
