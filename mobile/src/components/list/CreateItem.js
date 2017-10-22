import React, {Component} from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import {Card, CardSection, Input, Button} from '../common'
import {TextInput,View} from 'react-native';



class CreateItem extends Component{

    renderButton(){
        return (
            <Button whenPress={()=>console.log("button pressed")}>
                Create
            </Button>
        );
    }

    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        label="Title"
                        placeholder="title"
                        onChangeText={()=>console.log("title changed")}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <View style={styles.containerStyle}>
                        <Text style={styles.labelStyle}>Label</Text>
                        <TextInput
                            multiline={true}
                            autoGrow={true}
                            numberOfLines={6}
                            placeholder="placeholder"
                            autoCorrect={false}
                            value="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
                            // onChangeText={}
                            style={styles.inputStyle}
                        />
                    </View>
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
    },
    inputStyle: {
        color:'#000',
        paddingRight:5,
        paddingLeft:5,
        fontSize:18,
        lineHeight:23,
        flex:2
    },
    labelStyle: {
        fontSize:18,
        paddingLeft:20,
        flex:1
    },
    containerStyle:{
        height:40,
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    cardSectionOverrideStyle: {
        height: 100
    }
};


export default CreateItem;