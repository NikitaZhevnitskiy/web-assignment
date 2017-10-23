import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Card } from '../common';
import ListItem from './ListItem';
import { SearchBar } from 'react-native-elements';
import { ScrollView, StyleSheet } from 'react-native';
import {} from "../../actions/todolist/CreateItemActions";

import mockedItems from './items'

class ListComponent extends Component{

    render(){

        const items = mockedItems;
        return(
            <Card>
                <SearchBar
                    lightTheme
                    onChangeText={()=>console.log("text changed")}
                    placeholder='Type Here...' />

                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {items.map(item => {
                       return <ListItem item={item} key={item._id}/>
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
        token: state.auth.token
    };
};


export default connect(mapStateToProps,
    {

    }
)
(ListComponent);