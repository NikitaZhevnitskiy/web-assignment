import React, {Component} from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import {Card, CardSection, Input, Button} from './common'


class LoginForm extends Component{

    renderButton(){
        return (
            <Button whenPress={()=>console.log("button pressed")}>
                Login
            </Button>
        );
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="email@gmail.com"
                        onChangeText={()=>console.log("Email field changed")}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={()=>console.log("Password field changed")}
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
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default connect(null,null)(LoginForm);