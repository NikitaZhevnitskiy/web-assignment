import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
// COMPONENTS
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';

//Stabs
const SomePage = () => <div>Some page that exists</div>;
const NoMatch = () => <div>Page not exists</div>;

class App extends Component {
    render() {
        return(

            <BrowserRouter>
                <div className="container">
                    <Header/>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/signup" component={Signup}/>

                        <Route exact path="/somepage" component={SomePage}/>
                        <Route exact path="/" render={() => (<Redirect to="/somepage" />)} />
                        <Route path="*" component={NoMatch} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
