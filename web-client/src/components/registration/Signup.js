import React, {Component} from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import {URL_API_USERS} from '../../utils/RoutesApi'
import {isLogged} from "../../utils/AuthService";


class Signup extends Component {

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
            err: false,
            redirect: false
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({err: false});
        this.setState({redirect: false});

        fetch(URL_API_USERS, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(response => {
                console.log(response.status)
                if (response.status === 401) {
                    this.setState({err: true})
                    return
                }
                if (response.status === 201) {
                    this.setState({redirect: true})
                }
            })
    }
    render() {
        const {redirect}=this.state;
        if(redirect)
            return <Redirect to="/" />
        else {
            return(
                <div>
                    <div>
                        <h3>Signup</h3>
                        {this.state.err ?
                            <div className="alert alert-danger">
                                <strong>Error:</strong> Invalid input. (check email & password fields)
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
                                Signup
                            </Button>
                        </form>
                    </div>
                </div>
            )
        }
    }
}
export default Signup;