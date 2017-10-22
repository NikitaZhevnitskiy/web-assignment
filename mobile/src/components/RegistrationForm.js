import React, {Component} from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import {Card, CardSection, Input, Button} from './common'
import {emailChanged, passwordChanged, registerNewUser} from "../actions/index";


class RegistrationForm extends Component{

    renderButton(){
        return (
            <Button whenPress={this.onButtonPress.bind(this)}>
                Register
            </Button>
        );
    }

    onButtonPress(){
        const {email, password} = this.props;
        this.props.registerNewUser({email,password});
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
        email: state.registration.email,
        password: state.registration.password,
        error: state.registration.error
    };
};

export default connect(
    mapStateToProps,
    {
        emailChanged,
        passwordChanged,
        registerNewUser
    })
(RegistrationForm);