import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Card } from '../common';
import ListItem from './ListItem';
import { SearchBar } from 'react-native-elements';
import { ScrollView, StyleSheet } from 'react-native';
import { getItems } from "../../actions/todolist/ListActions";

import mockedItems from './items'

class ListComponent extends Component{

    componentDidMount(){
        this.props.getItems(this.props.token);
        console.log(this.props.items)
    }

    render(){
        // const items = mockedItems;
        return(
            <Card>
                <SearchBar
                    lightTheme
                    onChangeText={()=>console.log("keyword")}
                    placeholder='Type Here...' />

                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {this.props.items.map(item => {
                       return <ListItem item={item} key={item._id} whenPress={()=>console.log(item._id)}/>
                    })}
                </ScrollView>
            </Card>
        );
    };
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 20
    }
});

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        items: state.todo_list.list,
        filtered:state.todo_list.list,
        keyword: '',
        error: state.todo_list.error
    };
};


export default connect(mapStateToProps,
    {
        getItems
    }
)
(ListComponent);