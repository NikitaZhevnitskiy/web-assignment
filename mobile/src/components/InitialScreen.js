import React, {Component} from 'react';
import { Actions } from 'react-native-router-flux';
import {Card, CardSection, Button} from './common'

class InitialScreen extends Component{
    render(){
        return(
            <Card>
                <CardSection>
                    <Button whenPress={()=>{
                        Actions.loginForm()

                    }}>
                        Login
                    </Button>
                </CardSection>

                <CardSection>
                    <Button whenPress={()=>{
                        Actions.registrationForm()
                    }}>
                        Registration
                    </Button>
                </CardSection>
            </Card>
        );
    };
}

export default InitialScreen