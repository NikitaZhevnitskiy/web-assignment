import React, {Component} from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import {Card, CardSection, Input, Button} from './common'
import {emailChanged, passwordChanged} from "../actions/authentication/AuthActions";


class LoginForm extends Component{

    renderButton(){
        return (
            <Button whenPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        );
    }

    onButtonPress(){
        const {email, password} = this.props;
        console.log("button pressed")
        //TODO: validation, request, token + rest crap

    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChanged.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>

                <Text
                    style={styles.errorTextStyle}
                >
                    {this.props.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }

    onEmailChange(text){this.props.emailChanged(text);}
    onPasswordChanged(text){this.props.passwordChanged(text);}
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error
    };
};

export default connect(
    mapStateToProps,
    {
        emailChanged,
        passwordChanged
    })
(LoginForm);