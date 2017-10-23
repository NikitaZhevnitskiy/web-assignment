import React, {Component} from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import {Card, CardSection, Input, Button} from '../common'
import {TextInput,View} from 'react-native';
import {titleChanged, descriptionChanged, createItem} from "../../actions/todolist/CreateItemActions";



class CreateItem extends Component{

    renderButton(){
        return (
            <Button whenPress={this.onButtonPress.bind(this)}>
                Create
            </Button>
        );
    }

    onButtonPress(){
        const { title, description, token } = this.props;
        console.log(title+":"+description+"\ntoken:"+token);
        // Action
        this.props.createItem(title, description, token);
    }

    onTitleChange(text){this.props.titleChanged(text);}

    onDescriptionChange(text){this.props.descriptionChanged(text);}

    render(){

        return(
            <Card>
                <CardSection>
                    <Input
                        label="Title"
                        placeholder="title"
                        onChangeText={this.onTitleChange.bind(this)}
                        value={this.props.title}
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
                            value={this.props.description}
                            onChangeText={this.onDescriptionChange.bind(this)}
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

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        title: state.todo_item.title,
        description: state.todo_item.description,
        error: state.todo_item.error
    };
};

export default connect(mapStateToProps,
    {
        titleChanged,
        descriptionChanged,
        createItem
    }
)(CreateItem);