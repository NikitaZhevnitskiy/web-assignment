import React, {Component} from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import {URL_API_LOGIN} from "../../utils/RoutesApi";
import {setToken, isLogged} from '../../utils/AuthService';

class Login extends Component{
    componentDidMount(){
        if(isLogged()){
            this.setState({redirect:true})
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            err:false,
            redirect:false
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({err: false});
        this.setState({redirect: false});

        try {
            fetch(URL_API_LOGIN, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
                .then(response => {
                    switch(response.status){
                        case 401:{
                            console.log("Error 401")
                            this.setState({err: true})
                            return {}
                        }
                        case 500:{
                            console.log("Error 500")
                            this.setState({err: true})
                            return {}
                        }
                        case 200:{
                            console.log("All ok 200")
                            return response.json()
                        }
                        default:{
                            console.log("goes wrong")
                            return {}
                        }
                    }
                })
                .then(json => {
                    if(json.token){
                        // console.log(json.token);
                        setToken(json.token)
                        this.setState({redirect:true})
                    }
                })
        }catch (err){this.setState({err:true})}
    };

    render() {
        const {redirect}=this.state;
        if(redirect)
            return <Redirect to="/" />
        else {
            return(
                <div>
                    <div>
                        <h3>Login</h3>
                        {this.state.err ?
                            <div className="alert alert-danger">
                                <strong>Error:</strong> Check input fields
                            </div>
                            : ""}
                    </div>
                    <div className="Login">
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="email" bsSize="large">
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    type="password"
                                />
                            </FormGroup>
                            <Button
                                block
                                bsSize="large"
                                disabled={!this.validateForm()}
                                type="submit"
                            >
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
            )
        }
    }


}

export default Login;