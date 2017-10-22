import React, {Component} from 'react';
import { Actions } from 'react-native-router-flux';
import {Card, CardSection, Button} from '../common'

class List extends Component{
    render(){
        return(
            <Card>
                <CardSection>
                    <Button>
                        Yohohoho
                    </Button>
                </CardSection>
            </Card>
        );
    };
}

export default List